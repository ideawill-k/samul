// calculator.js - Part 1: 데이터 정의 및 초기화

// 사고유형 상세 데이터
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
        { description: "오토바이와 내차와 기타 사고", code: "acdnt0305", fault_percent: null },
        { description: "내 오토바이가 직진중 상대차가 껴들어 사고", code: "acdnt0306", fault_percent: 20 },
        { description: "내 오토바이가 직진중 상대차가 진입하여 사고", code: "acdnt0307", fault_percent: 10 },
        { description: "내 오토바이가 직진중 상대 차문이 열려서 사고", code: "acdnt0308", fault_percent: 20 },
        { description: "내 오토바이를 운전중 상대차와 기타 사고", code: "acdnt0309", fault_percent: null }
    ],
    "차VS기타": [
        { description: "기타 교통사고", code: "acdnt0401", fault_percent: null }
    ]
};

// 부상 부위별 상세 데이터
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
        { description: "척주 손상으로 완전 사지마비 또는 완전 하반신 마비를 동반한 상해", level: 1, id: "SP03" },
        { description: "척수 손상을 동반한 불안정성 방출성 척추 골절", level: 1, id: "SP04" },
        { description: "척추체골절 (압박골절) - 경추", level: 5, id: "SP05" },
        { description: "척추체골절 (압박골절) - 요추", level: 5, id: "SP06" },
        { description: "척추체골절 (압박골절) - 흉추", level: 5, id: "SP07" },
        { description: "디스크(추간판탈출증)", level: 9, id: "SP08" },
        { description: "염좌", level: 12, id: "SP09" }
    ],
    "어깨": [
        { description: "견관절 골절 및 탈구 (수술시행)", level: 3, id: "SD01" },
        { description: "견관절 골절 및 탈구 (수술미시행)", level: 6, id: "SD02" },
        { description: "회전근개파열 (수술시행)", level: 6, id: "SD03" },
        { description: "견갑골 골절", level: 7, id: "SD04" },
        { description: "견관절 탈구 (수술미시행)", level: 6, id: "SD05" },
        { description: "회전근개파열 (수술미시행)", level: 10, id: "SD06" },
        { description: "염좌", level: 12, id: "SD07" },
        { description: "타박상", level: 14, id: "SD08" }
    ],
    "무릎": [
        { description: "무릎 골절 및 탈구 (수술미시행)", level: 5, id: "KE01" },
        { description: "무릎 십자인대파열 (수술시행)", level: 5, id: "KE02" },
        { description: "무릎 측부인대파열 (수술시행)", level: 5, id: "KE03" },
        { description: "무릎 측부인대파열", level: 8, id: "KE08" },
        { description: "염좌", level: 12, id: "KE09" },
        { description: "타박상", level: 14, id: "KE10" }
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

// DOM이 로드되면 초기화
document.addEventListener('DOMContentLoaded', function() {
    initializeForm();
});

// 폼 초기화 함수
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
    ['injuryPart1', 'injuryPart2'].forEach((selectId, index) => {
        const select = document.getElementById(selectId);
        select.innerHTML = '<option value="">부위 선택</option>';
        Object.keys(injuryDetails).forEach(part => {
            const option = document.createElement('option');
            option.value = part;
            option.textContent = part;
            select.appendChild(option);
        });

        select.addEventListener('change', function(e) {
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
// calculator.js - Part 2: UI 업데이트 및 이벤트 처리

// 사고유형 상세 정보 업데이트
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
        const code = e.target.value;
        const detail = accidentDetails[type].find(d => d.code === code);
        if (detail) {
            formData.accidentDetail = detail;
            if (detail.fault_percent !== null) {
                document.getElementById('faultPercentInput').value = detail.fault_percent;
                formData.faultPercent = detail.fault_percent;
            }
        }
    };
}

// 부상 부위 상세 정보 업데이트
function updateInjuryDetails(part, index) {
    const containerId = `injuryDetailContainer${index}`;
    const existingContainer = document.getElementById(containerId);
    
    if (existingContainer) {
        existingContainer.remove();
    }

    if (!part) return;

    const containerDiv = document.createElement('div');
    containerDiv.id = containerId;
    containerDiv.className = 'select-wrapper mt-2';

    const select = document.createElement('select');
    select.className = 'input';
    select.id = `injuryDetail${index}`;
    select.required = true;
    select.innerHTML = '<option value="">상세 부상을 선택해주세요</option>';

    injuryDetails[part].forEach(detail => {
        const option = document.createElement('option');
        option.value = detail.id;
        option.textContent = `${detail.description} (${detail.level}급)`;
        select.appendChild(option);
    });

    containerDiv.appendChild(select);
    document.getElementById('injuryDetails').appendChild(containerDiv);

    // 상세 부상 선택 이벤트
    select.addEventListener('change', function(e) {
        const detailId = e.target.value;
        if (detailId) {
            const detail = injuryDetails[part].find(d => d.id === detailId);
            formData.selectedInjuryDetails[`injury${index}`] = detail;
        } else {
            delete formData.selectedInjuryDetails[`injury${index}`];
        }
    });
}

// 결과 표시 함수
function showResult(result) {
    // 금액 포맷팅 함수
    const formatAmount = (amount) => {
        return amount.toLocaleString() + '원';
    };

    // 결과 업데이트
    document.getElementById('totalAmount').textContent = formatAmount(result.calculator_total);
    document.getElementById('result01').textContent = formatAmount(result.calculator_sub01);
    document.getElementById('result02').textContent = formatAmount(result.calculator_sub02);
    document.getElementById('result03').textContent = formatAmount(result.calculator_sub03);
    document.getElementById('result05').textContent = formatAmount(result.calculator_sub05);
    document.getElementById('result06').textContent = formatAmount(result.calculator_sub06);
    document.getElementById('result07').textContent = formatAmount(result.calculator_sub07);
    document.getElementById('result09').textContent = formatAmount(result.calculator_sub09);
    document.getElementById('result10').textContent = formatAmount(result.calculator_sub10);

    // 모달 표시
    document.getElementById('resultModal').style.display = 'block';
}

// 모달 관련 함수들
function closeModal() {
    document.getElementById('resultModal').style.display = 'none';
}

// ESC 키로 모달 닫기
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// 모달 외부 클릭시 닫기
document.addEventListener('click', function(event) {
    const modal = document.getElementById('resultModal');
    if (event.target === modal) {
        closeModal();
    }
});

// 폼 초기화
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

    // 폼 요소 초기화
    document.getElementById('calculatorForm').reset();
    document.getElementById('accidentDetails').style.display = 'none';
    document.getElementById('injuryDetails').innerHTML = '';
    document.getElementById('faultPercentInput').value = '0';
}

// 폼 제출 처리
async function handleSubmit(event) {
    event.preventDefault();

    // 입력값 검증
    if (!validateForm()) {
        return;
    }
    
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

    try {
        const response = await fetch('https://samulxcar-ing.com/caring/calculator', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(submitData)
        });

        const result = await response.json();
        
        if (result.success) {
            showResult(result);
        } else {
            alert('계산 중 오류가 발생했습니다.');
        }
    } catch (error) {
        console.error('API 호출 오류:', error);
        alert('서버 통신 중 오류가 발생했습니다.');
    }
}

// 폼 검증 함수
function validateForm() {
    const requiredFields = {
        accidentType: "사고유형을 선택해주세요.",
        accidentDetail: "사고 상세유형을 선택해주세요.",
        ageInput: "현재 나이를 입력해주세요.",
        incomeInput: "월 소득을 입력해주세요.",
        hospitalizationDays: "입원 일수를 입력해주세요.",
        outpatientDays: "통원 일수를 입력해주세요.",
        hospitalCost: "병원비를 입력해주세요.",
        directPaymentCost: "직불치료비를 입력해주세요."
    };

    // 라디오 버튼 검증
    const radioGroups = {
        occupation: "직업을 선택해주세요.",
        surgery: "수술 여부를 선택해주세요.",
        insuranceType: "보험 유형을 선택해주세요."
    };

    let isValid = true;
    const errors = [];

    // 기본 필드 검증
    Object.entries(requiredFields).forEach(([fieldId, message]) => {
        const field = document.getElementById(fieldId);
        if (!field.value) {
            errors.push(message);
            isValid = false;
        }
    });

    // 라디오 버튼 검증
    Object.entries(radioGroups).forEach(([name, message]) => {
        if (!document.querySelector(`input[name="${name}"]:checked`)) {
            errors.push(message);
            isValid = false;
        }
    });

    // 부상 부위 검증
    if (!formData.selectedInjuries.part1) {
        errors.push("최소 한 개 이상의 부상 부위를 선택해주세요.");
        isValid = false;
    }

    if (!isValid) {
        alert('다음 항목을 확인해주세요:\n\n' + errors.join('\n'));
    }

    return isValid;
}