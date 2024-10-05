from django.shortcuts import render,redirect
from django.contrib.auth import authenticate,login as login_auth,logout
from django.views import View
from django.contrib.auth.models import User
from django.contrib import messages
from .models import Task


class loginView(View):
    
    def get(self,request):
        context = {"error":""}
        
        return render(request,'login.html',context)
    
    def post(self,request):
        # Get data from login form
        username = request.POST['username']
        password = request.POST['password']
        # checks whether the user already exist!
        user = authenticate(username = username ,password = password)
        # if username is unique then attempt to login  
        if user != None:
            login_auth(request,user)
            return redirect('tasks')
        # or shows error
        else:
            context = {"error":"Invalid username or password",'username':username}
            return render(request,'login.html',context)

class tasksView(View):
    
    def get(self,request):
        if not request.user.is_authenticated:
            return redirect('login')
        # Get all data from db and using all_todos obj
        all_todos = Task.objects.filter(user=request.user)
        user_name = request.user.username
        return render(request,'main.html',{'items':all_todos,'user_name':user_name})
    
    def post(self,request):
        usertask = request.POST['task']
        user_name = request.user.username
        if len(usertask) == 0:
            todo = Task.objects.filter(user=request.user)
            return render(request,'main.html',{'error':'Enter the Task','user_name':user_name})
        if len(usertask) > 0:
            new = Task(user=request.user,todo_name=usertask)
            new.save()
            return redirect('tasks')
            
        else:
            todo = Task.objects.filter(user=request.user)
            return render(request,'main.html',{'items':todo,'user_name':user_name})   
        
class registerView(View):
    
    def get(self,request):
        context = {
        "error":""
    }
        return render(request,'register.html',context)
    
    def post(self,request):
    # get all details in register page
        user = request.POST['username']
        pass_word = request.POST['password']
        conformpassword = request.POST['confirm_password']
        # check new username already exist
        user_name_check = User.objects.filter(username = user)
        if len(user_name_check) > 0:
            print("Name is exist!")
            context = {"error":"username already exists",'password':pass_word,'confirm_password':conformpassword}
            return render(request,'register.html',context)
        #  else attempt to register 
        
        else:
            # check password and conf password same
            if pass_word == conformpassword:
                new_user = User(username = user)
                new_user.set_password(pass_word)
                new_user.save()  # Save the user to the database
                messages.success(request, 'Register success! You can Login')
                return redirect('/')
            # throw error pass not matched
            else:
                context = {'error':"Password Not Matched",'username':user}
                return render(request,'register.html',context)         
        
class deleteView(View):
    
    def get(self,request,name):
        if not request.user.is_authenticated:
            return redirect('login')
        else:
        # get all data(ToDo Tasks) of that particular user
            get_todo = Task.objects.filter(user=request.user,todo_name = name)
            get_todo.delete()
            return redirect('tasks')
    
    def post(self,request):
        pass 

class updateView(View):
    
    def get(self,request,name):
        if not request.user.is_authenticated:
            return redirect('login')
        else:
            # get all data(ToDo Tasks) of that particular user
            get_todo = Task.objects.get(user=request.user,todo_name = name)
            get_todo.status = True
            get_todo.save()
            return redirect('tasks')
    
    def post(self,request):
        pass       
        
class logoutView(View):
    def get(self,request):
        logout(request)
        return redirect('login') 
       