class Book {
    constructor(title, author, isbn, availableCopies) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.availableCopies = availableCopies;
    }

    borrowBook() {
        if (this.availableCopies > 0) {
            this.availableCopies--;
        } else {
            console.log(`Không còn sách "${this.title}"`);
        }
    }

    returnBook() {
        this.availableCopies++;
    }
}


class User {
    constructor(name, userType) {
        if (this.constructor === User) {
            throw new Error("Không thể khởi tạo người dùng");
        }
        this.name = name;
        this.userType = userType;
        this.borrowedBooks = [];
    }

    return(book) {
        const bookIndex = this.borrowedBooks.indexOf(book);
        if (bookIndex > -1) {
            this.borrowedBooks.splice(bookIndex, 1);  
            book.returnBook();  
            console.log(`${this.name} đã trả sách "${book.title}"`);
        } else {
            console.log(`${this.name} không có mượn cuốn sách này`);
        }
    }

    
}




class Student extends User {
    constructor(name) {
        super(name, 'Student');
    }

    borrow(book) {
        if (this.borrowedBooks.length >= 2) {
            console.log(`Sinh viên ${this.name} đã đạt giới hạn mượn 2 cuốn tuần này!`);
            return;
        }
        if (book.availableCopies > 0) {
            this.borrowedBooks.push(book);
            book.borrowBook();
            console.log(`Sinh viên ${this.name} đã mượn sách "${book.title}"`);
        } else {
            console.log(`Sách "${book.title}" không còn nữa!`);
        }
    }
}


class Teacher extends User {
    constructor(name) {
        super(name, 'Teacher');
    }

    borrow(book) {
        if (this.borrowedBooks.length >= 3) {
            console.log(`Thầy/cô ${this.name} đã đạt giới hạn mượn 3 cuốn tuần này!`);
            return;
        }
        if (book.availableCopies > 0) {
            this.borrowedBooks.push(book);
            book.borrowBook();
            console.log(`Thầy/cô ${this.name} đã mượn sách "${book.title}"`);
        } else {
            console.log(`Sách "${book.title}" không còn nữa!`);
        }
    }
}


class Library {
    constructor() {
        this.books = [];
        this.users = [];
    }

    addBook(book) {
        this.books.push(book);
    }

    addUser(user) {
        this.users.push(user);
    }

    borrowBook(user, book) {
        if (this.books.includes(book)) {
            user.borrow(book);
        } else {
            console.log(`Sách "${book.title}" không tồn tại trong thư viện`);
        }
    }

    returnBook(user, book) {
        user.return(book);
    }

    listAvailableBooks() {
        console.log("Những sách còn: ");
        this.books.forEach(book => {
            if (book.availableCopies > 0) {
                console.log(`Sách "${book.title}" của tác giả ${book.author} còn ${book.availableCopies} cuốn`);
            }
        });
    }
}



// tạo 1 vài cuốn sách
const book1 = new Book("Kimetsu no Yaiba", "Koyoharu Gotouge", "9999", 3);
const book2 = new Book("Happiness", "Sony", "8888", 2);
const book3 = new Book("Love myself", "NhanNhiNhanh", "1111", 3);
const book4 = new Book("Memory", "ú ù", "2222", 2);

// tạo thư viện
const library = new Library();

// thêm sách vào thư viện
library.addBook(book1);
library.addBook(book2);
library.addBook(book3);

// tạo 1 vài user
const student1 = new Student("Lisa");
const student2 = new Student("Gia Hân");
const student3 = new Student("Thanh Xuân");
const student4 = new Student("Quốc Tuấn");
const teacher1 = new Teacher("Đăng Minh");
const teacher2 = new Teacher("Jennie");

// thêm user vào hệ thống thư viện
library.addUser(student1);
library.addUser(student2);
library.addUser(student3);
library.addUser(student4);
library.addUser(teacher1);
library.addUser(teacher2);

// liệt kê những sách còn
library.listAvailableBooks();

// nhập 1 vài user mượn sách
library.borrowBook(student1, book1); 
library.borrowBook(student1, book2);
library.borrowBook(student1, book3);
library.borrowBook(student2, book1);
library.borrowBook(student3, book1);
library.borrowBook(student4, book1);
library.borrowBook(teacher1, book2);
library.borrowBook(teacher1, book3);
library.borrowBook(teacher1, book3);
library.borrowBook(teacher1, book3);
library.borrowBook(teacher2, book2); 
library.borrowBook(teacher2, book4); 

// liệt kê số lượng sách còn sau khi đã được mượn
library.listAvailableBooks();

// nhập 1 vài user trả sách
library.returnBook(student3, book1);
library.returnBook(teacher1, book2);  
library.returnBook(teacher2, book2);

// liệt kê số lượng sách sau khi đã được trả
library.listAvailableBooks();