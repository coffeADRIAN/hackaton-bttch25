document.getElementById('riskForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const tipoVehiculo = document.getElementById('tipoVehiculo').value;
    const falla = document.getElementById('falla').value.toLowerCase();
    const velocidad = parseInt(document.getElementById('velocidad').value);
    const mantenimiento = parseInt(document.getElementById('mantenimiento').value);
    const clima = document.getElementById('clima').value;
    const severidad = document.querySelector('input[name="severidad"]:checked').value;

    let riesgo = 'bajo';
    let mensaje = 'Riesgo bajo. Puede continuar con precaución.';
    let recomendaciones = ['Realice un mantenimiento preventivo en los próximos meses.'];

    // Lógica de evaluación
    let puntosRiesgo = 0;

    if (velocidad > 100) puntosRiesgo += 3;
    else if (velocidad > 60) puntosRiesgo += 2;
    else if (velocidad > 30) puntosRiesgo += 1;

    if (mantenimiento > 12) puntosRiesgo += 3;
    else if (mantenimiento > 6) puntosRiesgo += 2;
    else if (mantenimiento > 3) puntosRiesgo += 1;

    if (severidad === 'alta') puntosRiesgo += 3;
    else if (severidad === 'media') puntosRiesgo += 2;

    if (clima === 'lluvia' || clima === 'nieve') puntosRiesgo += 2;
    else if (clima === 'viento') puntosRiesgo += 1;

    // Palabras clave en la falla
    const palabrasAltoRiesgo = ['frenos', 'motor', 'transmisión', 'dirección', 'explosión', 'fuego'];
    const palabrasMedioRiesgo = ['aceite', 'batería', 'neumáticos', 'luces'];

    palabrasAltoRiesgo.forEach(palabra => {
        if (falla.includes(palabra)) puntosRiesgo += 3;
    });

    palabrasMedioRiesgo.forEach(palabra => {
        if (falla.includes(palabra)) puntosRiesgo += 2;
    });

    // Clasificación
    if (puntosRiesgo >= 8) {
        riesgo = 'alto';
        mensaje = 'Riesgo alto. Deténgase inmediatamente en un lugar seguro y no continúe conduciendo.';
        recomendaciones = [
            'Llame a una grúa o asistencia en carretera.',
            'No intente reparar el vehículo usted mismo.',
            'Contacte a un taller mecánico certificado.',

            'Si es posible, use transporte alternativo.'
        ];
    } else if (puntosRiesgo >= 5) {
        riesgo = 'medio';
        mensaje = 'Riesgo medio. Reduzca la velocidad y diríjase a un taller lo antes posible.';
        recomendaciones = [
            'Reduzca la velocidad y evite maniobras bruscas.',
            'Programe una revisión en un taller mecánico.',
            'Verifique fluidos y componentes básicos.',
            'Considere el clima actual para mayor precaución.'
        ];
    } else {
        riesgo = 'bajo';
        mensaje = 'Riesgo bajo. Puede continuar, pero mantenga la vigilancia.';
        recomendaciones = [
            'Monitoree el vehículo durante el viaje.',
            'Programe mantenimiento preventivo.',
            'Verifique regularmente el estado del vehículo.'
        ];
    }

    // Ajustes por tipo de vehículo
    if (tipoVehiculo === 'camion' || tipoVehiculo === 'camioneta') {
        if (riesgo === 'medio') riesgo = 'alto';
        mensaje += ' (Riesgo aumentado por el tipo de vehículo)';
    }

    const resultadoSection = document.getElementById('resultado');
    resultadoSection.classList.remove('hidden');
    const resultContent = document.querySelector('#resultado .result-content') || document.createElement('div');
    resultContent.className = 'result-content';
    resultContent.innerHTML = `
        <h3>Riesgo evaluado: <span class="${riesgo}">${riesgo.toUpperCase()}</span></h3>
        <p><strong>${mensaje}</strong></p>
        <h4>Recomendaciones:</h4>
        <ul>
            ${recomendaciones.map(rec => `<li>${rec}</li>`).join('')}
        </ul>
        <p><em>Recuerde: Esta es una evaluación automática. Consulte a un profesional para un diagnóstico preciso.</em></p>
        <button class="print-btn" onclick="window.print()"><i class="fas fa-print"></i> Imprimir resultado</button>
    `;
    if (!document.querySelector('#resultado .result-content')) {
        resultadoSection.appendChild(resultContent);
    }

    // Scroll to result
    resultadoSection.scrollIntoView({ behavior: 'smooth' });
});


// Reset form
document.getElementById('riskForm').addEventListener('reset', function() {
    const resultContent = document.querySelector('#resultado .result-content');
    if (resultContent) {
        resultContent.remove();
    }
    document.getElementById('resultado').classList.add('hidden');
});
