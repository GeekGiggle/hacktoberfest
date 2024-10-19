import pandas as pd
from sklearn.model_selection import train_test_split
import lightgbm as lgb
from hyperopt import fmin, tpe, hp, STATUS_OK, Trials
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.preprocessing import LabelEncoder
import joblib
import numpy as np

# Define CustomLabelEncoder class
class CustomLabelEncoder(LabelEncoder):
    def __init__(self, unknown_value=-1):
        super().__init__()
        self.unknown_value = unknown_value

    def fit(self, y):
        # Add 'Unknown' category for unknown values
        y = np.append(y, ['Unknown'])
        super().fit(y)
        self.unknown_value = np.where(self.classes_ == 'Unknown')[0][0]  # Ensure 'Unknown' has a consistent index
        return self

    def transform(self, y):
        labels = np.array([str(x) for x in y])  # Convert all labels to strings
        # Use the base class's classes_ to map the labels
        encoded = np.array([self.transform_label(label) for label in labels])
        return encoded

    def transform_label(self, label):
        """ Helper function to transform a single label to its index """
        if label in self.classes_:
            return super().transform([label])[0]
        else:
            return self.unknown_value

    def inverse_transform(self, y):
        decoded = np.array([self.classes_[int(x)] if x >= 0 and x < len(self.classes_) else 'Unknown' for x in y])
        return decoded

# Load the dataset
df = pd.read_csv("abroad  - Sheet1.csv")

# Data preprocessing
df["FEES"] = pd.to_numeric(df["FEES"], errors='coerce')
df["FEES"].fillna(df["FEES"].median(), inplace=True)

# Apply CustomLabelEncoder to categorical columns
label_encoders = {}
for col in ['COUNTRY', 'COURSE TYPE', 'COURSE (SPECIALIZATION)']:
    label_encoders[col] = CustomLabelEncoder()
    df[col] = label_encoders[col].fit_transform(df[col])

# Prepare features and target variable
X = df[['COUNTRY', 'COURSE TYPE', 'COURSE (SPECIALIZATION)']]
y = df['FEES']

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Define the objective function for Hyperopt
def objective(params):
    gbm = lgb.LGBMRegressor(
        objective='regression',
        metric='rmse',
        boosting_type='gbdt',
        num_leaves=max(int(params['num_leaves']), 2),
        learning_rate=params['learning_rate'],
        feature_fraction=params['feature_fraction'],
        bagging_fraction=params['bagging_fraction'],
        bagging_freq=int(params['bagging_freq']),
        max_depth=int(params['max_depth']),
        n_estimators=100
    )
    
    gbm.fit(X_train, y_train)
    y_pred = gbm.predict(X_test)
    rmse = mean_squared_error(y_test, y_pred, squared=False)
    
    return {'loss': rmse, 'status': STATUS_OK}

# Define the search space for hyperparameters
space = {
    'num_leaves': hp.quniform('num_leaves', 2, 256, 1),
    'learning_rate': hp.loguniform('learning_rate', -5, -1),
    'feature_fraction': hp.uniform('feature_fraction', 0.5, 1.0),
    'bagging_fraction': hp.uniform('bagging_fraction', 0.5, 1.0),
    'bagging_freq': hp.quniform('bagging_freq', 1, 10, 1),
    'max_depth': hp.quniform('max_depth', 3, 20, 1)
}

# Optimize the hyperparameters using Hyperopt
trials = Trials()
best = fmin(
    fn=objective,
    space=space,
    algo=tpe.suggest,
    max_evals=50,
    trials=trials
)

print("Best Hyperparameters:", best)

# Train the final model with the best hyperparameters
final_gbm = lgb.LGBMRegressor(
    objective='regression',
    metric='rmse',
    boosting_type='gbdt',
    num_leaves=max(int(best['num_leaves']), 2),
    learning_rate=best['learning_rate'],
    feature_fraction=best['feature_fraction'],
    bagging_fraction=best['bagging_fraction'],
    bagging_freq=int(best['bagging_freq']),
    max_depth=int(best['max_depth']),
    n_estimators=100
)

final_gbm.fit(X_train, y_train)

# Save the model
joblib.dump(final_gbm, "lgbm_model.joblib")

# Save label encoder information
label_encoder_info = {}
for col, encoder in label_encoders.items():
    label_encoder_info[col] = encoder
joblib.dump(label_encoder_info, "label_encoder_info.joblib")

# Evaluate the final model
y_final_pred = final_gbm.predict(X_test)
final_rmse = mean_squared_error(y_test, y_final_pred, squared=False)
final_r2 = r2_score(y_test, y_final_pred)

print(f"Final RMSE: {final_rmse}")
print(f"Final R²: {final_r2}")
