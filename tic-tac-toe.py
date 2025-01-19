from tkinter import *
from tkinter.messagebox import showinfo
import warnings

#Removes all the warning from the output

warnings.filterwarnings('ignore')

root=Tk()


numbers=[1,2,3,4,5,6,7,8,9] 
# y='X' for player1 and 'O' for player2
y=""
# x is the counter to keep counting the number of chances
x=0
#boards is a list to store the mark with respect to the cell number
boards=["board"]*10

def result(boards,mark):
    return ((boards[1] == boards[2] == boards [3] == mark) 
            or (boards[4] == boards[5] == boards [6] == mark) 
            or (boards[7] == boards[8] == boards [9] == mark) 
            or (boards[1] == boards[4] == boards [7] == mark) 
            or (boards[2] == boards[5] == boards [8] == mark)
            or (boards[3] == boards[6] == boards [9] == mark)
            or (boards[1] == boards[5] == boards [9] == mark) 
            or (boards[3] == boards[5] == boards [7] == mark))


def define_sign(number):
    global x,y,numbers
    """ Checking which button has been clicked and checking if the button has been already clicked or not to avoid over-writing"""
    if number==1 and number in numbers:
        numbers.remove(number)

        # If the value of x is even, Person1 will play and vivee versa
        if x%2==0:
            y='X'
            boards[number]=y
        elif x%2!=0:
            y='O'
            boards[number]=y
        #Using config, we write mark the button with appropriate value. 
        b1.config(text=y)
        x=x+1
        mark=y
        # Here we are calling the result() to decide whether we have got the winner or not
        if(result(boards,mark) and mark=='X' ):
            #If Player1 is the winner show a dialog box stating the winner
            showinfo("Result","Player1 wins")
            #Call the destroy function to close the GUI
            destroys()
        elif(result(boards,mark) and mark=='O'):
            showinfo("Result","Player2 wins")
            destroys()

    if number==2 and number in numbers:
        numbers.remove(number)
        if x%2==0:
            y='X'
            boards[number]=y
        elif x%2!=0:
            y='O'
            boards[number]=y

        b2.config(text=y)
        x=x+1
        mark=y
        if(result(boards,mark)and mark=='X' ):
            showinfo("Result","Player1 wins")
            destroys()
        elif(result(boards,mark)and mark=='O' ):
            showinfo("Reuslt","Player2 wins")
            destroys()

    if number==3 and number in numbers:
        numbers.remove(number)
        if x%2==0:
            y='X'
            boards[number]=y

        elif x%2!=0:
            y='O'
            boards[number]=y    
        b3.config(text=y)
        x=x+1
        mark=y
        if(result(boards,mark)and mark=='X'):
            showinfo("Result","Player1 wins")
            destroys()
        elif(result(boards,mark) and mark=='O'):
            showinfo("Result","Player2 wins")
            destroys()

    if number==4 and number in numbers:
        numbers.remove(number)
        if x%2==0:
            y='X'
            boards[number]=y

        elif x%2!=0:
            y='O'
            boards[number]=y  
        b4.config(text=y)
        x=x+1
        mark=y
        if(result(boards,mark)and mark=='X'):
            showinfo("Result","Player1 wins")
            destroys()
        elif(result(boards,mark) and mark=='O'):
            showinfo("Result","Player2 wins")
            destroys()

    if number==5 and number in numbers:
        numbers.remove(number)
        if x%2==0:
            y='X'
            boards[number]=y
        elif x%2!=0:
            y='O'
            boards[number]=y

        b5.config(text=y)
        x=x+1
        mark=y
        if(result(boards,mark)and mark=='X' ):
            showinfo("Result","Player1 wins")
            destroys()
        elif(result(boards,"O")and mark=='O'):
            showinfo("Result","Player2 wins")
            destroys()

    if number==6 and number in numbers:
        numbers.remove(number)
        if x%2==0:
            y='X'
            boards[number]=y
        elif x%2!=0:
            y='O'
            boards[number]=y

        b6.config(text=y)
        x=x+1
        mark=y
        if(result(boards,mark) and mark=='X'):
            showinfo("Result","Player1 wins")
            destroys()
        elif(result(boards,mark)and mark=='O'):
            showinfo("Result","Player2 wins")
            destroys()

    if number==7 and number in numbers:
        numbers.remove(number)
        if x%2==0:
            y='X'
            boards[number]=y

        elif x%2!=0:
            y='O'
            boards[number]=y

        b7.config(text=y)
        x=x+1
        mark=y
        if(result(boards,mark) and mark=='X' ):
            showinfo("Result","Player1 wins")
            destroys()
        elif(result(boards,mark) and mark=='O'):
            print("Player2 wins")
            showinfo("Result","Player2 wins")
            destroys()

    if number==8 and number in numbers:
        numbers.remove(number)
        if x%2==0:
            y='X'
            boards[number]=y

        elif x%2!=0:
            y='O'
            boards[number]=y

        b8.config(text=y)
        x=x+1
        mark=y
        if(result(boards,mark) and mark=='X'):
            print("Player1 wins")
            showinfo("Result","Player1 wins")
            destroys()
        elif(result(boards,"O")and mark=='O'):
            print("Player2 wins")
            showinfo("Result","Player2 wins")
            destroys()
    if number==9 and number in numbers:
        numbers.remove(number)
        if x%2==0:
            y='X'
            boards[number]=y

        elif x%2!=0:
            y='O'
            boards[number]=y

        b9.config(text=y)
        x=x+1
        mark=y
        if(result(boards,mark) and mark=='X'):
            print("Player1 wins")
            showinfo("Result","Player1 wins")
            destroys()
        elif(result(boards,mark) and mark=='O'):
            print("Player2 wins")
            showinfo("Result","Player2 wins")
            destroys()

    # If we have not got any winner, display the dialogbox stating the match has bee tied.
    if(x>8 and result(boards,'X')==False and result(boards,'O')==False):
        showinfo("Result","Match Tied")
        destroys()



label1=Label(root,text="player1 : X",font="times 15")
label1.grid(row=0,column=1)


l2=Label(root,text="player2 : O",font="times 15")
l2.grid(row=0,column=2)


def destroys():
    # destroys the window when called
    root.destroy()


b1=Button(root,width=20,height=10,command=lambda:define_sign(1))
b1.grid(row=1,column=1)
b2=Button(root,width=20,height=10,command=lambda:define_sign(2))
b2.grid(row=1,column=2)
b3=Button(root,width=20,height=10,command=lambda: define_sign(3))
b3.grid(row=1,column=3)
b4=Button(root,width=20,height=10,command=lambda: define_sign(4))
b4.grid(row=2,column=1)
b5=Button(root,width=20,height=10,command=lambda: define_sign(5))
b5.grid(row=2,column=2)
b6=Button(root,width=20,height=10,command=lambda: define_sign(6))
b6.grid(row=2,column=3)
b7=Button(root,width=20,height=10,command=lambda: define_sign(7))
b7.grid(row=3,column=1)
b8=Button(root,width=20,height=10,command=lambda: define_sign(8))
b8.grid(row=3,column=2)
b9=Button(root,width=20,height=10,command=lambda: define_sign(9))
b9.grid(row=3,column=3)
root.mainloop()

class TicTacToe:
    def __init__(self):
        self.root = Tk()
        self.root.title("Tic Tac Toe")
        self.x = 0
        self.boards = [""] * 10
        self.create_widgets()

    def create_widgets(self):
        self.label1 = Label(self.root, text="Player1 : X", font="times 15")
        self.label1.grid(row=0, column=1)

        self.l2 = Label(self.root, text="Player2 : O", font="times 15")
        self.l2.grid(row=0, column=2)

        self.buttons = []
        for i in range(1, 10):
            button = Button(self.root, width=20, height=10, command=lambda number=i: self.define_sign(number))
            button.grid(row=(i-1)//3 + 1, column=(i-1)%3 + 1)
            self.buttons.append(button)

    def define_sign(self, number):
        if number in range(1, 10) and self.boards[number] == "":
            self.boards[number] = "X" if self.x % 2 == 0 else "O"
            self.buttons[number-1].config(text=self.boards[number])
            self.x += 1
            if self.result(self.boards, self.boards[number]):
                showinfo("Result", "Player1 wins" if self.boards[number] == "X" else "Player2 wins")
                self.root.destroy()
            elif self.x > 8:
                showinfo("Result", "Match Tied")
                self.root.destroy()

    def result(self, boards, mark):
        winning_combinations = [(1, 2, 3), (4, 5, 6), (7, 8, 9), (1, 4, 7), (2, 5, 8), (3, 6, 9), (1, 5, 9), (3, 5, 7)]
        for combination in winning_combinations:
            if all(boards[i] == mark for i in combination):
                return True
        return False

    def run(self):
        self.root.mainloop()

if __name__ == "__main__":
    game = TicTacToe()
    game.run()
