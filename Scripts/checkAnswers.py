import csv

newAnswers = ".//Dictionaries/NewAnswers.csv"
Guesses = ".//Dictionaries/Guesses.csv"

#function of script
def check():
	try:
		with open(newAnswers, 'r') as nA, open(Guesses, 'r') as g:

			wordReader = csv.reader(nA) #NewAnswers object
			words = next(wordReader) #Read word list from newAnswers

			guessReader = csv.reader(g) #Guess object
			guesses = next(guessReader) #Read word list from guesses

			x=-1

			for guess in guesses:
				x=x+1
				for word in words:
					if word==guess:
						print(str(x)+" "+word)
	except IOError as e:
	    print('Operation failed: %s' % e.strerror)
	except:
		print("Unexpected error occured")

if __name__ == '__main__':
    #executed as script
    check()
