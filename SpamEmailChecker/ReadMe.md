# Spam Email Detection using Bayesian Probability

This project is a simple implementation of a spam email detection model using **Bayesian probability**. It was developed using **Pandas** and a Jupyter Notebook (**.ipynb**) to demonstrate how to classify emails as spam or not spam based on certain features.

## Features
The dataset used for this project contains the following attributes for each email:
- **Contains_Offer**: Indicates if the email contains the word "offer" (Yes/No).
- **Contains_Win**: Indicates if the email contains the word "win" (Yes/No).
- **Contains_Financial**: Indicates if the email contains financial terms (Yes/No).
- **Email_Length**: The total length of the email (number of characters).
- **Capital_Letter_Ratio**: The ratio of capital letters to total characters.

## Objective
The goal of this project is to classify emails as **Spam** or **Not Spam** based on the above features. We utilize Bayesian probability to compute the likelihood that an email is spam given its characteristics.

## Tools Used
- **Pandas**: For data manipulation and probability calculations.
- **Jupyter Notebook**: To organize and execute the project.

## Approach
1. **Data Preprocessing**: The email features are cleaned and organized using Pandas.
2. **Bayesian Classification**: Using Bayesian probability, we calculate the probability of an email being spam or not spam based on the features.
3. **Output**: For each email, the model predicts whether it is **Spam** or **Not Spam**.

## Getting Started
To run the project:
1. Install dependencies: `pip install pandas jupyterlab`
2. Run the Jupyter notebook containing the implementation.

## Conclusion
This project is a simple yet effective approach to spam detection using Bayesian probability theory. It demonstrates how Bayesian inference can be applied to real-world data to classify emails based on key features.

