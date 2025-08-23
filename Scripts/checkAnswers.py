import csv
newAnswers = ".//Dictionaries/NewAnswers.csv"
Guesses = ".//Dictionaries/Guesses.csv"

try:
	with open(newAnswers, 'r') as nA, open(Guesses, 'r') as g:

		wordReader = csv.reader(nA) #NewAnswers object
		words = next(wordReader) #Read word list from newAnswers
		
		guessReader = csv.reader(g) #Guess object
		guesses = next(guessReader) #Read word list from guesses

		for word in words:
			for guess in guesses:
				if word==guess:
					print(word)

except IOError as e:
    print('Operation failed: %s' % e.strerror)