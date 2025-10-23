import csv

Guesses = ".//Dictionaries/Guesses.csv"
Current = ".//Dictionaries/Current.csv"

#validate user entry
def validate(entry):
	if len(entry)>5:
		entry = entry[:5]
	if len(entry)==0:
		return 0
	return entry

#Adds words containing letters chosen
def check(entry):

	emptyList = True
	guessList=[]
	if entry != 0:
		try:
			with open(Current, 'r') as c:
				currentReader = csv.reader(c)
				guessList=next(currentReader)
				if len(guessList)>1:
					emptyList=False
		except:
			print("Invalid entry")

		try:
			with open(Guesses, 'r') as g:

				wordReader = csv.reader(g) #Guess object
				words = next(wordReader) #Read word list from guesses

				if emptyList:
					for word in words:
						if entry[0] in word:
							guessList.append(word)
				if len(entry)>0:
					for i in range(0, len(entry)):
						tempList=[]
						#print()
						#print(guessList)
						for guess in guessList:
							if entry[i] in guess:
								tempList.append(guess)
						guessList=tempList

			with open(Current, 'w') as c:
				printList=""
				guessList.sort()
				print(guessList)
				for word in guessList:
					if word!="":
						printList += word+","
				c.write(printList)

		except IOError as e:
			print('Operation failed: %s' % e.strerror)
		#except:
			#print("Unexpected error occured")
			#return

if __name__ == '__main__':
    #executed as script
	print("Enter your letters:")
	entry = input()
	check(validate(entry))
