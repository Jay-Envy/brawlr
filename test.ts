interface User{
    firstName: string,
    lastName: string,
    age?: number,
    hobbies?: string[]
}

const lector: User = {
    firstName: "Jelle",
    lastName: "Vermeulen"
}

let color: 'red' | 'green' | 'blue';
//mogelijk maar niet flexibel

enum Color {
    red = 'r',
    green = 'g',
    blue = 'b'
}

console.log(Color.red === 'r'); 
//standaard krijgt elk element in een enum een nummer -> red === 0
//ook mogelijk een string waarde te geven

//FUNCTIES

function deleteUser(user: User): void{
    //delete the user
}

const deleteUser1 = (user: User): void => {
    //delete the user
}

const domElement = document.getElementById('voorbeeld-button')!; //"!" na init geeft aan dat je zeker bent dat de knop met id "#voorbeeld-button" bestaat
domElement.addEventListener('click', (evt) => console.log('Geklikt'));

if(lector.hobbies !== undefined){
    console.log(lector.hobbies[0]);
}

console.log(lector.hobbies?.flat(0)); //deze code is hetzelfde als bovenstaande if

//nullish coalescing operator geeft rechter element terug als het linker element
console.log(null ?? 'Dit wordt teruggegeven');
console.log(undefined ?? 'Dit wordt teruggegeven');
console.log('' ?? 'Dit wordt NIET teruggegeven');

//wil je elke falsy waarde als ongeldig beschouwen, gebruik dan ||
console.log('' || 'Dit wordt teruggegeven');