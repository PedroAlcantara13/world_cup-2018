const url = 'http://localhost:3000/groups';
const grupos = document.getElementById('group');
async function chamarApi(){
    const resp = await fetch(url);
    if(resp.status === 200){
        const obj = await resp.json();
        console.log(obj[1].teams[0].name);
        for(cont = 0; cont < 8; cont++){
        grupos.innerHTML += `
        <div class="col-md-6 col-lg-3">
            <div class="grupo-box">
                <h3>${obj[cont].name}</h3>
                    <ul id="team">
                        <li><span class="${obj[cont].teams[0].fi}"></span> ${obj[cont].teams[0].name}</li>
                        <li><span class="${obj[cont].teams[1].fi}"></span> ${obj[cont].teams[1].name}</li>
                        <li><span class="${obj[cont].teams[2].fi}"></span> ${obj[cont].teams[2].name}</li>
                        <li><span class="${obj[cont].teams[3].fi}"></span> ${obj[cont].teams[3].name}</li>
                    </ul>
            </div>
        </div>
        `
        }
    }
}

chamarApi();

const url1 = 'http://localhost:3001/rounds';
const rodadas = document.getElementById('rodadas');
async function chamarApi1(){
    const resp1 = await fetch(url1);
    if(resp1.status === 200){
        const obj1 = await resp1.json();
        console.log(obj1[0].matches[0].date);
        for(cont = 0; cont < 4; cont++){
            rodadas.innerHTML += `
            <h3>Rodada ${cont+1}</h3>
            <div class="row">
                <div class="col-md-6 col-lg-4">
                    <div class="match-card">
                        <p class="match-date">${obj1[cont].matches[cont].date}</p>
                        <div class="match-info">
                            <span>${obj1[cont].matches[cont].team1.name}</span>
                            <span class="match-score">${obj1[cont].matches[cont].score1} x ${obj1[cont].matches[cont].score2}</span>
                            <span>${obj1[cont].matches[cont].team2.name}</span>
                        </div>
                    </div>
                </div>
            </div>
            `
            }
    }
}

chamarApi1();


