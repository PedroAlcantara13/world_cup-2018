//json-server --watch 2018/worldcup.groups.json --port 3000
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

//json-server --watch 2018/worldcup.json --port 3001
const url1 = 'http://localhost:3001/rounds';
const rodadas = document.getElementById('rodadas');

async function chamarApi1() {
    const resp1 = await fetch(url1);
    if (resp1.status === 200) {
        const obj1 = await resp1.json();
        let todasPartidas = [];

        // Junta todas as partidas em uma única lista
        obj1.forEach(round => {
            todasPartidas = todasPartidas.concat(round.matches);
        });

        let rodadaNum = 1;
        let partidasGrupo = [];

        // Percorre todas as partidas e agrupa em rodadas de 16 partidas
        todasPartidas.forEach((match, index) => {
            partidasGrupo.push(match);

            // Quando atingir 16 partidas ou for a última partida, cria uma rodada
            if (partidasGrupo.length === 16 || index === todasPartidas.length - 1) {
                const rodadaDiv = document.createElement('div');
                rodadaDiv.classList.add('container', 'mb-4');
                rodadaDiv.innerHTML = `<h3 class="text-center mb-3">Rodada ${rodadaNum}</h3><div class="row"></div>`;

                const rowDiv = rodadaDiv.querySelector('.row');

                partidasGrupo.forEach((partida) => {
                    const partidaDiv = document.createElement('div');
                    partidaDiv.classList.add('col-md-6', 'col-lg-4', 'mb-3');
                    partidaDiv.innerHTML = `
                    <div class="card">
                        <div data-status="inprogress" class="teams">
                            <span class="team-info team-home">
                                <span class="team-info-container">
                                    <span class="team-name-info">${partida.team1.code}</span>
                                    </span>
                                </span>
                            <span class="event-scoreboard">
                                <span class="event-score-container">
                                    <span class="current-time-container">
                                        <span class="event-current-time">
                                            <span class="event-clock">${partida.date}</span>
                                            <span class="current-part">${partida.time}</span>
                                        </span>
                                    <span class="progress-dots" data-progress="1S">
                                </span>
                            </span>
                            <span class="score-container">
                                <span class="score-home">${partida.score1}</span>
                                <span class="custom-sep">-</span>
                                <span class="score-away">${partida.score2}</span>
                            </span>
                            </span>
                        </span>
                        <span class="team-info team-away">
                            <span class="team-info-container">
                            <span class="team-icon-container"></span>
                            <span class="team-name-info">${partida.team2.code}</span>
                            </span>
                        </span>
                        </div>
                    </div>



                        
                    `;
                    rowDiv.appendChild(partidaDiv);
                });

                rodadas.appendChild(rodadaDiv);
                rodadaNum++; // Incrementa o número da rodada
                partidasGrupo = []; // Reseta a lista para a próxima rodada
            }
        });
    }
}

chamarApi1();





