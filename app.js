async function loadTable() {
  const res = await fetch('data.json');
  const data = await res.json();

  // Set league info
  document.getElementById('league-logo').src = data.league.logo;
  document.getElementById('league-name').textContent = data.league.name;

  const body = document.getElementById('table-body');

  data.teams.forEach(team => {
    const row = document.createElement('div');
    row.className = 'row' + (team.eliminated ? ' elim' : '');

    const formBadges = team.form
      .map(r => `<div class="form-badge ${r}">${r}</div>`)
      .join('');

    row.innerHTML = `
      <div class="position">${team.position}</div>
      <div class="team">
        <img src="${team.logo}" alt="${team.name}">
        <div class="team-name">${team.name}</div>
      </div>
      <div class="form">${formBadges}</div>
      <div class="stat">${team.mp}</div>
      <div class="stat">${team.w}</div>
      <div class="stat">${team.d}</div>
      <div class="stat">${team.l}</div>
      <div class="stat">${team.gd > 0 ? '+' + team.gd : team.gd}</div>
      <div class="stat pts">${team.pts}</div>
    `;

    body.appendChild(row);
  });
}

loadTable();
