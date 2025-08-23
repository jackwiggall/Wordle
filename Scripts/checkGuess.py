import csv

Guesses = ".//Dictionaries/Guesses.csv"
Answers = ".//Dictionaries/Answers.csv"
Words = ".//Dictionaries/Words.csv"

#function of script
def checkWordList(entry):
	try:
		with open(Words, 'r') as w:

			wordReader = csv.reader(w) #Word object
			words = next(wordReader) #Read word list from all words

			x=-1
			found = False

			for word in words:
				x=x+1
				if word==entry:
					#print("Valid guess")
					valid=True
					return
			if found==False:
				print("Invalid guess")
				return #word not possible answer

	except IOError as e:
	    print('Operation failed: %s' % e.strerror)
	except:
		print("Unexpected error occured")
	return

#function of script
def checkAnswerList(entry):
	try:
		with open(Answers, 'r') as a:

			ansReader = csv.reader(a) #Answer object
			answers = next(ansReader) #Read word list from answers

			x=-1
			found=False

			for ans in answers:
				x=x+1
				if entry==ans:
					print("Word already used") #not wordle number
					found=True
					return

	except IOError as e:
	    print('Operation failed: %s' % e.strerror)
	except:
		print("Unexpected error occured")
	return

#function of script
def checkGuessList(entry):
	try:
		with open(Guesses, 'r') as g:

			guessReader = csv.reader(g) #Guess object
			guesses = next(guessReader) #Read word list from guesses

			x=-1
			found=False

			for guess in guesses:
				x=x+1
				if entry==guess:
					print("Word possible")
					found=True
					return

	except IOError as e:
	    print('Operation failed: %s' % e.strerror)
	except:
		print("Unexpected error occured")
	return

if __name__ == '__main__':
    #executed as script
	print("Enter your word:")
	entry = input()
	checkWordList(entry)
	checkAnswerList(entry)
	checkGuessList(entry)
