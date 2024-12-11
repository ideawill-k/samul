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
    selectedInjuries: {
        part1: null,
        part2: null
    },
    selectedInjuryDetails: {}
};

// 초기화 및 이벤트 리스너 설정
document.addEventListener('DOMContentLoaded', function() {
    initializeForm();
});

function initializeForm() {
    // 사고유형 선택 이벤트
    document.getElementById('accidentType').addEventListener('change', function(e) {
        const type = e.target.value;
        formData.accidentType = type;
        updateAccidentDetails(type);
    });

    // 과실 비율 입력 이벤트
    document.getElementById('faultPercentInput').addEventListener('input', function(e) {
        let value = parseInt(e.target.value) || 0;
        value = Math.max(0, Math.min(100, value));
        e.target.value = value;
        formData.faultPercent = value;
    });

    // 부상 부위 선택 이벤트
    ['injuryPart1', 'injuryPart2'].forEach((id, index) => {
        document.getElementById(id).addEventListener('change', function(e) {
            const part = e.target.value;
            if (index === 0) {
                formData.selectedInjuries.part1 = part;
            } else {
                formData.selectedInjuries.part2 = part;
            }
            updateInjuryDetails(part, index + 1);
        });
    });
}

function updateAccidentDetails(type) {
    const detailsContainer = document.getElementById('accidentDetails');
    const detailSelect = document.getElementById('accidentDetail');

    if (!type) {
        detailsContainer.style.display = 'none';
        return;
    }

    detailSelect.innerHTML = '<option value="">상세 유형을 선택해주세요</option>';
    accidentDetails[type].forEach(detail => {
        const option = document.createElement('option');
        option.value = detail.code;
        option.textContent = detail.description;
        detailSelect.appendChild(option);
    });

    detailsContainer.style.display = 'block';

    // 상세 유형 선택 이벤트
    detailSelect.onchange = function(e) {
        const detail = accidentDetails[type].find(d => d.code === e.target.value);
        if (detail) {
            formData.accidentDetail = detail;
            if (detail.fault_percent !== null) {
                document.getElementById('faultPercentInput').value = detail.fault_percent;
                formData.faultPercent = detail.fault_percent;
            }
        }
    };
}

function updateInjuryDetails(part, index) {
    const containerDiv = document.createElement('div');
    containerDiv.id = `injuryDetailContainer${index}`;
    containerDiv.className = 'select-wrapper mt-2';

    if (!part) {
        const existingContainer = document.getElementById(`injuryDetailContainer${index}`);
        if (existingContainer) {
            existingContainer.remove();
        }
        return;
    }

    const select = document.createElement('select');
    select.className = 'input';
    select.id = `injuryDetail${index}`;
    select.innerHTML = `<option value="">상세 부상을 선택해주세요</option>`;

    injuryDetails[part].forEach(detail => {
        const option = document.createElement('option');
        option.value = detail.id;
        option.textContent = `${detail.description} (${detail.level}급)`;
        select.appendChild(option);
    });

    containerDiv.appendChild(select);

    const existingContainer = document.getElementById(`injuryDetailContainer${index}`);
    if (existingContainer) {
        existingContainer.replaceWith(containerDiv);
    } else {
        document.getElementById('injuryDetails').appendChild(containerDiv);
    }

    // 상세 부상 선택 이벤트
    select.onchange = function(e) {
        const detailId = e.target.value;
        if (detailId) {
            const detail = injuryDetails[part].find(d => d.id === detailId);
            formData.selectedInjuryDetails[`injury${index}`] = detail;
        } else {
            delete formData.selectedInjuryDetails[`injury${index}`];
        }
    };
}

function resetForm() {
    formData = {
        accidentType: '',
        accidentDetail: null,
        faultPercent: 0,
        selectedInjuries: {
            part1: null,
            part2: null
        },
        selectedInjuryDetails: {}
    };

    document.getElementById('calculatorForm').reset();
    document.getElementById('accidentDetails').style.display = 'none';
    document.getElementById('injuryDetails').innerHTML = '';
}

function handleSubmit(event) {
    event.preventDefault();
    
    // 폼 데이터 수집
    const submitData = {
        accident_type: formData.accidentType,
        accident_description: formData.accidentDetail?.description,
        accident_code: formData.accidentDetail?.code,
        fault_percent: formData.faultPercent,
        user_age: parseInt(document.getElementById('ageInput').value) || 0,
        user_monthly_income: parseInt(document.getElementById('incomeInput').value) || 0,
        job: document.querySelector('input[name="occupation"]:checked')?.value,
        surgery: document.querySelector('input[name="surgery"]:checked')?.value === 'true',
        hospitalization_days: parseInt(document.getElementById('hospitalizationDays').value) || 0,
        treatment_days: parseInt(document.getElementById('outpatientDays').value) || 0,
        insurance_type: document.querySelector('input[name="insuranceType"]:checked')?.value,
        hospital_cost: parseInt(document.getElementById('hospitalCost').value) || 0,
        treatment_cost: parseInt(document.getElementById('directPaymentCost').value) || 0,
        injuries: Object.values(formData.selectedInjuryDetails)
    };

    console.log('제출 데이터:', submitData);
    // API 호출 로직 추가
}