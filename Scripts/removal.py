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

#Removes words containing letters inputted
def check(entry):

	if entry == 0:
		try:
			with open(Current, 'w') as c:
				c.write("")
		except:
			print("Invalid entry")
		return

	try:
		guessList=[]
		with open(Guesses, 'r') as g:

			wordReader = csv.reader(g) #Guess object
			words = next(wordReader) #Read word list from guesses

			if len(entry)>0:
				for word in words:
					found=False
					for i in range(0, len(entry)):
						if entry[i] in word:
							found=True
					if found==False:
						guessList.append(word)


		with open(Current, 'w') as c:
			printList=""
			guessList.sort()
			for word in guessList:
				print(word)
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
	check(entry)
