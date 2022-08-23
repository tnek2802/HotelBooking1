import sqlite3
db = sqlite3.connect('db.sqlite')

db.execute('''CREATE TABLE room(
    roomId INTEGER PRIMARY KEY,
    roomType TEXT NOT NULL,
    price TEXT NOT NULL
)''')

db.execute('''CREATE TABLE hotel(
    roomId INTEGER PRIMARY KEY,
    roomType TEXT NOT NULL,
    guestNum TEXT NOT NULL,
    startDate TEXT NOT NULL,
    endDate TEXT NOT NULL
)''')

db.execute('''CREATE TABLE guestInfo(
    roomId INTEGER PRIMARY KEY AUTOINCREMENT,
    roomType TEXT NOT NULL,
    quantity TEXT NOT NULL,
    price TEXT NOT NULL,
    phoneNum TEXT NOT NULL,
    name TEXT NOT NULL,
    startDate TEXT NOT NULL,
    endDate TEXT NOT NULL
)''')

db.execute('''CREATE TABLE adminAcc(
    username TEXT NOT NULL,
    password TEXT NOT NULL
)''')



cursor = db.cursor()

cursor.execute('''INSERT INTO room(roomId, roomType, price) VALUES("01","Superior Double Suite","388")''')
cursor.execute('''INSERT INTO room(roomId, roomType, price) VALUES("02","Superior Family Suite","588")''')
cursor.execute('''INSERT INTO room(roomId, roomType, price) VALUES("03","Executive Family Suite","888")''')
cursor.execute('''INSERT INTO room(roomId, roomType, price) VALUES("04","Celebration Family Suite","1088")''')
cursor.execute('''INSERT INTO hotel(roomId, roomType, guestNum, startDate, endDate) VALUES("01","Superior Double Suite", "2","27/08/22","29/08/22")''')
cursor.execute('''INSERT INTO hotel(roomId, roomType, guestNum, startDate, endDate) VALUES("02","Superior Family Suite","4","28/08/22","31/08/22")''')
cursor.execute('''INSERT INTO guestInfo(roomId, roomType, quantity, price, phoneNum, name, startDate, endDate) VALUES("01","Superior Double Suite","5","388","019441445", "Shiin Wei", "27/08/22","29/08/22")''')
cursor.execute('''INSERT INTO guestInfo(roomId, roomType, quantity, price, phoneNum, name, startDate, endDate) VALUES("02","Superior Family Suite","2","588","019888888", "Zi Weng", "31/08/22","01/09/22")''')
cursor.execute('''INSERT INTO guestInfo(roomId, roomType, quantity, price, phoneNum, name, startDate, endDate) VALUES("03","Celebration Family Suite","3","588","019439775", "Jasper", "30/09/22","01/10/22")''')
cursor.execute('''INSERT INTO adminAcc(username, password) VALUES("admin", "admin")''')


db.commit()
db.close()