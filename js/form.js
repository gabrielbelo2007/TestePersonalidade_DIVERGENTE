document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('personalityForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Mostrar feedback visual
    const submitButton = this.querySelector('button[type="submit"]');
    submitButton.innerHTML = '<span class="spinner"></span> Processando...';
    submitButton.disabled = true;
    
    // Coletar todas as respostas do formulário
    const formData = new FormData(this);
    const responses = {};
    
    // Converter FormData para objeto
    for (let [key, value] of formData.entries()) {
      responses[key] = value;
    }
    
    // Contar respostas por perfil
    const counts = { A: 0, B: 0, C: 0, D: 0 };
    
    for (let key in responses) {
      if (responses.hasOwnProperty(key)) {
        counts[responses[key]]++;
      }
    }
    
    // Calcular total de perguntas respondidas
    const totalQuestions = Object.keys(responses).length;
    
    // Calcular porcentagens
    const percentages = {
      navegador: Math.round((counts.A / totalQuestions) * 100),
      comandante: Math.round((counts.B / totalQuestions) * 100),
      explorador: Math.round((counts.C / totalQuestions) * 100),
      desbravador: Math.round((counts.D / totalQuestions) * 100)
    };
    
    // Encontrar o perfil dominante
    let maxCount = 0;
    let dominantProfile = '';
    
    const profileMap = {
      'A': 'navegador',
      'B': 'comandante',
      'C': 'explorador',
      'D': 'desbravador'
    };
    
    for (let profile in counts) {
      if (counts[profile] > maxCount) {
        maxCount = counts[profile];
        dominantProfile = profileMap[profile];
      }
    }
    
    // Armazenar os resultados no localStorage
    localStorage.setItem('personalityResults', JSON.stringify({
      percentages: percentages,
      dominantProfile: dominantProfile
    }));
    
    // Redirecionar para a página do perfil
    window.location.href = `./perfis/${dominantProfile}.html`;
  });
});