import csv

Current = ".//Dictionaries/Current.csv"

#Removes words containing letters inputted
def reset():
	try:
		with open(Current, 'w') as c:
			c.write("")
	except:
		print("Invalid entry")
	return

if __name__ == '__main__':
    #executed as script
	reset()
