import csv

newAnswers = ".//Dictionaries/NewAnswers.csv"
Answers = ".//Dictionaries/Answers.csv"

#function of script
def addFile():
	try:
		ansList = [] #list of existing answers
		with open(newAnswers, 'r') as nA, open(Answers, 'r') as a:

			wordReader = csv.reader(nA) #NewAnswers object
			words = next(wordReader) #Read word list from newAnswers

			ansReader = csv.reader(a) #Answer object
			answer = next(ansReader) #Read word list from answers

			for ans in answer:
				if ans!="":
					found=False
					for word in words:
						if word!="":
							if ans==word:
								found=True #word exists in both dictionaries
								ansList.append(word) #keep in list
								break
					if found==False: #only exists in this list
						ansList.append(ans) #add to list

			for word in words:
				if word!="":
					found=False
					for ans in answer:
						if ans!="":
							if ans==word:
								found=True #word exists in both dictionaries
								break
					if found==False: #only exists in this list
						ansList.append(word) #add to list
						print(word) #show new words
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

def getEntry(userList):
	print("Enter the word of choice:")
	word_input = input(" ")
	userList.append(word_input)
	usr_input = 2
	print("Please select an option:")
	print("0 to exit")
	print("1 to enter another word")
	while (usr_input != '0') and (usr_input != '1'):
		usr_input = input(" ")
	if usr_input == '0':
	    addEntry(userList)
	elif usr_input == '1':
		getEntry(userList)

def addEntry(entryList):
	print(entryList)
	printList = ""
	if (entryList!=""):
		try:
			with open(newAnswers, 'r') as nA:

				oldList = csv.reader(nA) #NewAnswers object
				try:
					oldies = next(oldList) #Read word list from newAnswers
				except:
					oldies = ""

				if (oldies!=""):
					print("olduie")
					for word in oldies:
						if word!="":
							printList += word+","
					print(printList)

			with open(newAnswers, 'w') as NA:
				for word in entryList:
					if word!="":
						printList += word+","
				NA.write(printList)
		except:
			print("Unexpected error occured")

if __name__ == '__main__':
    #executed as script
	usr_input = 2
	print("Please select an option:")
	print("0 for adding from file")
	print("1 for adding from input")
	while (usr_input != '0') and (usr_input != '1'):
		usr_input = input("")

	if usr_input == '0':
	    addFile()
	elif usr_input == '1':
		userList = []
		getEntry(userList)
