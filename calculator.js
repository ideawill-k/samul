// 데이터 정의
const accidentDetails = {
    "차VS차": [
        { description: "뒤차가 내차 후미를 추돌하여 사고", code: "acdnt0101", fault_percent: 0 },
        { description: "직진 중 상대차가 옆에서 껴들어 사고", code: "acdnt0102", fault_percent: 30 },
        { description: "상대차가 정차중 출발하여 사고", code: "acdnt0103", fault_percent: 20 },
        { description: "신호없는 교차로에서 사고 (상대차 오른쪽)", code: "acdnt0104", fault_percent: 60 },
        { description: "신호없는 교차로에서 사고 (상대차 왼쪽)", code: "acdnt0105", fault_percent: 40 },
        { description: "신호있는 교차로", code: "acdnt0107", fault_percent: null },
        { description: "주차장 내", code: "acdnt0108", fault_percent: null },
        { description: "기타 차VS차 사고", code: "acdnt0106", fault_percent: null }
    ],
    "차VS사람": [
        { description: "내가 보행중 골목길에서 상대차와 사고", code: "acdnt0201", fault_percent: 0 },
        { description: "내가 보행중 횡단보도 부근에서 상대차와 사고", code: "acdnt0202", fault_percent: 30 },
        { description: "내가 보행중 상대차와 기타 사고", code: "acdnt0203", fault_percent: 0 },
        { description: "내가 보행중 횡단보도 위에서 상대차와 사고", code: "acdnt0204", fault_percent: 0 }
    ],
    "차VS이륜": [
        { description: "뒤에서 오토바이가 내차를 추돌 사고", code: "acdnt0301", fault_percent: 0 },
        { description: "내차가 직진중 오토바이가 껴들어 사고", code: "acdnt0302", fault_percent: 40 },
        { description: "오토바이가 차도로 진입하여 내차를 추돌 사고", code: "acdnt0303", fault_percent: 20 },
        { description: "내차 우회전중 우측을 뒤에서 오토바이가 추돌", code: "acdnt0304", fault_percent: 40 },
        { description: "오토바이와 내차와 기타 사고", code: "acdnt0305", fault_percent: null }
    ],
    "차VS기타": [
        { description: "기타 교통사고", code: "acdnt0401", fault_percent: null }
    ]
};

const injuryDetails = {
    "머리": [
        { description: "3cm이상의 안면부 열상", level: 10, id: "HD01" },
        { description: "안와골절 재건술 시행", level: 7, id: "HD02" },
        { description: "뇌출혈 (수술 했거나 의식상실 있는경우)", level: 6, id: "HD03" },
        { description: "뇌출혈 (수술미시행)", level: 8, id: "HD04" },
        { description: "뇌진탕", level: 11, id: "HD05" },
        { description: "치아골절", level: 12, id: "HD06" },
        { description: "타박상", level: 14, id: "HD07" }
    ],
    "척추": [
        { description: "척주 손상으로 불완전 하반신마비를 동반한 상해", level: 3, id: "SP01" },
        { description: "척주 손상으로 불완전 사지마비를 동반한 상해", level: 2, id: "SP02" },
        { description: "디스크(추간판탈출증)", level: 9, id: "SP08" },
        { description: "염좌", level: 12, id: "SP09" }
    ],
    "어깨": [
        { description: "견관절 골절 및 탈구 (수술시행)", level: 3, id: "SD01" },
        { description: "견관절 골절 및 탈구 (수술미시행)", level: 6, id: "SD02" },
        { description: "회전근개파열 (수술시행)", level: 6, id: "SD03" },
        { description: "회전근개파열 (수술미시행)", level: 10, id: "SD06" }
    ],
    "무릎": [
        { description: "무릎 골절 및 탈구 (수술미시행)", level: 5, id: "KE01" },
        { description: "무릎 십자인대파열 (수술시행)", level: 5, id: "KE02" },
        { description: "무릎 측부인대파열 (수술시행)", level: 5, id: "KE03" },
        { description: "무릎 측부인대파열", level: 8, id: "KE08" }
    ],
    "발목/발": [
        { description: "족관절 골절 및 탈구로 수술시행", level: 3, id: "FT01" },
        { description: "족관절 골절 (양과, 삼과 골절)", level: 5, id: "FT02" },
        { description: "족관절 탈구 (수술시행)", level: 5, id: "FT03" }
    ]
};

// 상태 관리
let formData = {
    accidentType: '',
    accidentDetail: null,
    faultPercent: 0,
    selectedInjuries: [],
    selectedInjuryDetails: {}
};

// 초기화 함수
window.onload = function() {
    initializeAccidentTypes();
    initializeInjuryParts();
    initializeFaultPercentSlider();
};

function initializeAccidentTypes() {
    const container = document.getElementById('accidentTypes');
    Object.keys(accidentDetails).forEach(type => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'btn';
        button.textContent = type;
        button.onclick = () => selectAccidentType(type);
        container.appendChild(button);
    });
}

function initializeInjuryParts() {
    const container = document.getElementById('injuryParts');
    Object.keys(injuryDetails).forEach(part => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'btn';
        button.textContent = part;
        button.onclick = () => selectInjuryPart(part);
        container.appendChild(button);
    });
}

function initializeFaultPercentSlider() {
    const slider = document.getElementById('faultPercentInput');
    const display = document.getElementById('faultPercentValue');
    
    slider.addEventListener('input', function() {
        const value = this.value;
        display.textContent = value + '%';
        formData.faultPercent = parseInt(value);
    });
}

// 사고유형 선택 처리
function selectAccidentType(type) {
    formData.accidentType = type;
    formData.accidentDetail = null;

    // UI 업데이트
    document.querySelectorAll('#accidentTypes .btn').forEach(btn => {
        btn.classList.toggle('selected', btn.textContent === type);
    });

    // 상세 정보 표시
    const detailsContainer = document.getElementById('accidentDetails');
    detailsContainer.innerHTML = '';

    accidentDetails[type].forEach(detail => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'btn detail-btn';
        button.innerHTML = `
            <div class="detail-description">${detail.description}</div>
            ${detail.fault_percent !== null ? 
                `<div class="detail-fault">과실: ${detail.fault_percent}%</div>` : 
                ''}
        `;
        button.onclick = () => selectAccidentDetail(detail);
        detailsContainer.appendChild(button);
    });
}

// 사고 상세 선택 처리
function selectAccidentDetail(detail) {
    formData.accidentDetail = detail;
    
    // UI 업데이트
    document.querySelectorAll('#accidentDetails .btn').forEach(btn => {
        btn.classList.toggle('selected', 
            btn.querySelector('.detail-description').textContent === detail.description);
    });

    // 과실 비율 자동 설정
    if (detail.fault_percent !== null) {
        const slider = document.getElementById('faultPercentInput');
        const display = document.getElementById('faultPercentValue');
        slider.value = detail.fault_percent;
        display.textContent = detail.fault_percent + '%';
        formData.faultPercent = detail.fault_percent;
    }

    // 선택 정보 표시
    updateSelectedAccidentInfo();
}

// 부상 부위 선택 처리
function selectInjuryPart(part) {
    const index = formData.selectedInjuries.indexOf(part);
    
    if (index === -1) {
        if (formData.selectedInjuries.length < 2) {
            formData.selectedInjuries.push(part);
            formData.selectedInjuryDetails[part] = null;
        }
    } else {
        formData.selectedInjuries.splice(index, 1);
        delete formData.selectedInjuryDetails[part];
    }

    // UI 업데이트
    document.querySelectorAll('#injuryParts .btn').forEach(btn => {
        btn.classList.toggle('selected', formData.selectedInjuries.includes(btn.textContent));
    });

    // 상세 정보 표시
    showInjuryDetails();
}

// 부상 상세 정보 표시
function showInjuryDetails() {
    const container = document.getElementById('injuryDetails');
    container.innerHTML = '';

    formData.selectedInjuries.forEach(part => {
        const section = document.createElement('div');
        section.className = 'section';
        section.innerHTML = `<h3 class="section-title">${part}의 상세 부상을 선택해주세요.</h3>`;

        const details = injuryDetails[part];
        details.forEach(detail => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'btn detail-btn';
            if (formData.selectedInjuryDetails[part]?.id === detail.id) {
                button.classList.add('selected');
            }
            button.innerHTML = `
                <div class="detail-description">${detail.description}</div>
                <div class="detail-fault">부상등급: ${detail.level}급</div>
            `;
            button.onclick = () => selectInjuryDetail(part, detail);
            section.appendChild(button);
        });

        container.appendChild(section);
    });
}

// 부상 상세 선택 처리
function selectInjuryDetail(part, detail) {
    formData.selectedInjuryDetails[part] = detail;

    // UI 업데이트
    const buttons = document.querySelectorAll(`#injuryDetails .btn`);
    buttons.forEach(btn => {
        if (btn.querySelector('.detail-description').textContent === detail.description) {
            btn.classList.add('selected');
        }
    });

    updateSelectedInjuryInfo();
}

// 선택 정보 업데이트
function updateSelectedAccidentInfo() {
    const container = document.getElementById('selectedAccidentInfo');
    if (formData.accidentDetail) {
        container.style.display = 'block';
        container.innerHTML = `
            <h4>선택된 사고 정보</h4>
            <p>${formData.accidentType} - ${formData.accidentDetail.description}</p>
            ${formData.accidentDetail.fault_percent !== null ? 
                `<p>과실: ${formData.accidentDetail.fault_percent}%</p>` : 
                ''}
        `;
    } else {
        container.style.display = 'none';
    }
}

function updateSelectedInjuryInfo() {
    const container = document.getElementById('selectedInjuryInfo');
    const hasDetails = Object.values(formData.selectedInjuryDetails).some(detail => detail !== null);
    
    if (hasDetails) {
        container.style.display = 'block';
        container.innerHTML = `
            <h4>선택된 부상 정보</h4>
            ${Object.entries(formData.selectedInjuryDetails)
                .filter(([_, detail]) => detail !== null)
                .map(([part, detail]) => `
                    <p>${part} - ${detail.description}</p>
                    <p>부상등급: ${detail.level}급</p>
                `).join('')}
        `;
    } else {
        container.style.display = 'none';
    }
}

// 폼 초기화
function resetForm() {
    formData = {
        accidentType: '',
        accidentDetail: null,
        faultPercent: 0,
        selectedInjuries: [],
        selectedInjuryDetails: {}
    };

    // UI 초기화
    document.querySelectorAll('.btn.selected').forEach(btn => btn.classList.remove('selected'));
    document.getElementById('accidentDetails').innerHTML = '';
    document.getElementById('injuryDetails').innerHTML = '';
    document.getElementById('selectedAccidentInfo').style.display = 'none';
    document.getElementById('selectedInjuryInfo').style.display = 'none';
    document.getElementById('faultPercentInput').value = 0;
    document.getElementById('faultPercentValue').textContent = '0%';
    
    // 폼 입력값 초기화
    document.getElementById('calculatorForm').reset();
}

// 폼 제출 처리
function handleSubmit(event) {
    event.preventDefault();
    
    // 폼 데이터 수집
    const formElements = event.target.elements;
    const submitData = {