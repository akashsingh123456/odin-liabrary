
const myLibrary = [];
const formContainer = document.querySelector('.form-container');
const form1 = formContainer.querySelector('.form1');
const booksContainer = formContainer.querySelector('.books table tbody');

function Book(title,author,pages,read) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  this.changReadState = function(){
    this.read=!this.read;
  }
}

function addBookToLibrary(e) {
  // do stuff here
  e.preventDefault();
 let book = new Book(
    e.target.querySelector('input[name="book-name"]').value,
    e.target.querySelector('input[name="author"]').value,
    e.target.querySelector('input[name="pages-number"]').value,
    e.target.querySelector('input[name="done-reading"]').checked,
 );

 myLibrary.push(book);
 populateBooks(booksContainer,myLibrary)

}

function populateBooks(bookList,books){

  bookList.innerHTML = books.map((book,i)=>{
    return`
     <tr data-index="${i}" >
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.pages}</td>
        <td><input type="checkbox" data-read-index="${i}" ${book.read ? "checked":""} ></td>
        <td><button class="delete" data-delete-index="${i}" >delete</button></td>
    </tr>
    `;
  }).join("");

}
function deleteItem(index){
  myLibrary.splice(index,1);
  let li=booksContainer.querySelector(`tr[data-index="${index}"]`);
   populateBooks(booksContainer,myLibrary)
}

form1.addEventListener('submit',addBookToLibrary);
booksContainer.addEventListener('click',function(e){
  if(e.target.matches('.delete')){
      //call delete funciotn
      let index =parseInt(e.target.dataset.deleteIndex);
    deleteItem(index)
  }else if(e.target.matches('input[type="checkbox"]')){
    //call change read state funcions
    let index=parseInt(e.target.dataset.readIndex);
    let book = myLibrary[index]
    book.changReadState();
    console.log(myLibrary)
  }
  console.log(e.target)
},{
  capture:true,
})
