import csv

newAnswers = ".//Dictionaries/NewAnswers.csv"
Answers = ".//Dictionaries/Answers.csv"

try:
	ansList = [] #list of existing answers
	with open(newAnswers, 'r') as nA, open(Answers, 'r') as a:

		wordReader = csv.reader(nA) #NewAnswers object
		words = next(wordReader) #Read word list from newAnswers

		ansReader = csv.reader(a) #Answer object
		answer = next(ansReader) #Read word list from answers

		for word in words:
			if word!="":
				found=False
				for ans in answer:
					if ans==word:
						found=True #word exists in both dictionaries
						ansList.append(word) #keep in list
				if found==False:
					ansList.append(word) #add to list
					print(word)
			ansList.sort()

	with open(Answers, 'w') as A:
		printList=""
		if (ansList!=""):
			for word in ansList:
				if word!="":
					printList += word+","
			A.write(printList) #adds list of new answers

	with open(newAnswers, 'w') as NA:
		NA.write("") #clears new answer list

except IOError as e:
    print('Operation failed: %s' % e.strerror)
except:
	print("Unexpected error occured")
