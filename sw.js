// --- CRITICAL UPDATE TO THE REFRESH LOGIC ---

function refresh() {
    // 1. Save the main data to storage FIRST
    localStorage.setItem('billiard_vFinal_MVP_v3', JSON.stringify(matches));
    
    const container = document.getElementById('match-container');
    container.innerHTML = ''; // Wipes and rebuilds
    
    let totalHome = 0;
    let totalAway = 0;

    matches.forEach((m, i) => {
        // Calculate scores for the bottom bar
        totalHome += getPts('h', i);
        totalAway += getPts('a', i);

        const card = document.createElement('div');
        card.className = `match-card ${m.done ? 'card-done' : ''}`;
        
        // This is the active card logic
        if (!m.done) {
            card.innerHTML = `
                <div class="head-active">
                    <span>MATCH ${i+1}</span>
                    <button onclick="finM(${i})">FINISH</button>
                </div>
                <div style="padding:12px; display:grid; grid-template-columns:1fr 1fr; gap:10px;">
                    <div style="text-align:center;">
                        <input value="${m.h.n}" 
                               placeholder="Home Player" 
                               oninput="matches[${i}].h.n=this.value; saveToData()">
                        
                        <button class="lag-btn ${m.lag==='h' ? 'lag-won':''}" 
                                onclick="matches[${i}].lag='h'; refresh()">LAG WINNER</button>
                        
                        <select onchange="matches[${i}].h.sl=parseInt(this.value); refresh()">
                            ${[1,2,3,4,5,6,7,8,9].map(s => `<option value="${s}" ${m.h.sl==s?'selected':''}>SL ${s}</option>`).join('')}
                        </select>
                        
                        <div class="need-box">NEED: ${Math.max(0, races[m.h.sl] - m.h.b)}</div>
                    </div>

                    <div style="text-align:center;">
                        <input value="${m.a.n}" 
                               placeholder="Away Player" 
                               oninput="matches[${i}].a.n=this.value; saveToData()">
                        
                        <button class="lag-btn ${m.lag==='a' ? 'lag-won':''}" 
                                onclick="matches[${i}].lag='a'; refresh()">LAG WINNER</button>
                        
                        <select onchange="matches[${i}].a.sl=parseInt(this.value); refresh()">
                            ${[1,2,3,4,5,6,7,8,9].map(s => `<option value="${s}" ${m.a.sl==s?'selected':''}>SL ${s}</option>`).join('')}
                        </select>
                        
                        <div class="need-box">NEED: ${Math.max(0, races[m.a.sl] - m.a.b)}</div>
                    </div>
                </div>
            `;
        }
        container.appendChild(card);
    });
}

// Simple helper to save without a full screen refresh (prevents cursor jumping)
function saveToData() {
    localStorage.setItem('billiard_vFinal_MVP_v3', JSON.stringify(matches));
}