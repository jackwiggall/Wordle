import csv

newAnswers = ".//Dictionaries/NewAnswers.csv"
Guesses = ".//Dictionaries/Guesses.csv"

try:
	guessList = [] #list of guessable words
	with open(newAnswers, 'r') as nA, open(Guesses, 'r') as g:

		wordReader = csv.reader(nA) #NewAnswers object
		words = next(wordReader) #Read word list from newAnswers
		
		guessReader = csv.reader(g) #Guess object
		guesses = next(guessReader) #Read word list from guesses
			
		for guess in guesses:
			found=""
			for word in words:
				if guess==word:
					found=word
			if found=="":
				guessList.append(guess) #add to list of words
				found=""

	with open(Guesses, 'w') as nG:
		printList=""		
		for word in guessList:
			if word!="":
				printList += word+","
		nG.write(printList)
					
except IOError as e:
    print('Operation failed: %s' % e.strerror)