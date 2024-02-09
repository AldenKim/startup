
class Ratings{
    constructor(){
        const userName = document.querySelector('.user-name');
        userName.textContent = this.getUserName();
    }

    getUserName() {
        return localStorage.getItem('userName') ?? 'Unknown';
    }
}

const ratings = new Ratings();