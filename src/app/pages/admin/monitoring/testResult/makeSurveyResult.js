import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver';

const surveySample = [{
    "title": "교육훈련 설문 조사",
    "head": "교육기간 동안 수고 많으셨습니다. 이 설문 조사는 금번 교육운영 전반에 대한 여러분의 의견을 수렴하여 향후 교육운영 개선에 반영하고자 하는 것이오니, 성의껏 작성하여 주시기 바랍니다. (해당란에 표기해 주시고, 구체적인 의견이 있으시면 직접 기재해 주시기 바랍니다.)",
    "item1Row": "기본 항록",
    "item1": [
        {
            "itemName": "성별",
            "uuid": "f7b656ba-17ca-47ae-a8f1-61f4803e1bb8",
            "selection": [
                " 남",
                " 여"
            ],
            "answer": 2
        },
        {
            "itemName": "연령",
            "uuid": "6315e384-9cc9-4e44-8909-9d698b607495",
            "selection": [
                "  30세 이하",
                " 31~35세",
                " 36~40세",
                " 41~45세",
                " 46~50세",
                "51세 이상"
            ],
            "answer": 2
        },
        {
            "itemName": "최종 학력",
            "uuid": "97fe2787-b5ad-4897-93eb-c14f0f9b5923",
            "selection": [
                "  고등학교졸업",
                " 전문학사",
                " 학사",
                " 석사",
                " 박사"
            ],
            "answer": 1
        },
        {
            "itemName": "소속 기관",
            "uuid": "83d41ba5-a591-48d3-be65-815b5fd5660f",
            "selection": [
                "  수로측량업체",
                " 해양관측업체",
                " 해도제작업체",
                " 그 외(__)"
            ],
            "answer": 3
        },
        {
            "itemName": "직위",
            "uuid": "de82f06f-14de-4908-bfbe-8b994e38d6fa",
            "selection": [
                "  사원",
                " 대리",
                " 과장",
                " 차장",
                " 부장",
                " 임원"
            ],
            "answer": 2
        },
        {
            "itemName": "수로분야 기술등급",
            "uuid": "ab551977-c488-4c5c-ad62-5d761ac061a8",
            "selection": [
                "  초급",
                " 중급",
                " 고급",
                " 특급"
            ],
            "answer": 1
        },
        {
            "itemName": "총근무년수",
            "uuid": "38445c36-2a98-4012-989b-5c1102429f58",
            "selection": [
                "  1년 이하",
                " 2~5년",
                " 6~10년",
                " 11~15년",
                " 16~20년",
                " 21년 이상"
            ],
            "answer": 4
        }
    ],
    "item2Desc": "1. 교육훈련 전반에 관한 설문입니다. 다음 설문 문항에 대해 해당하는 부분에 표시해 주십시오.",
    "item2Col": [
        {
            "str": "항목",
            "colspan": 2
        },
        {
            "str": " 매우 그렇다",
            "colspan": 1
        },
        {
            "str": " 그렇다",
            "colspan": 1
        },
        {
            "str": " 보통",
            "colspan": 1
        },
        {
            "str": " 그렇지 않다",
            "colspan": 1
        },
        {
            "str": " 전혀 그렇지 않다",
            "colspan": 1
        }
    ],
    "item2Row": [
        {
            "rowHead": "교육내용",
            "rowspan": 3,
            "secondRow": [
                {
                    "str": "교육관정의 학습목표가 분명하게 제시되었다. ",
                    "choice": 2,
                    "uuid": "1927bf48-1b23-4b18-8088-cf7d6ce29425"
                },
                {
                    "str": "교육과정의 내용이 직무와 관련이 있다.",
                    "choice": 1,
                    "uuid": "453851c8-ea27-43e3-8332-3964717dc0f6"
                },
                {
                    "str": "교육 수준의 난이도가 적정하였다.",
                    "choice": 1,
                    "uuid": "a5b865d1-6bc0-456b-87b4-71f0390b6dd1"
                }
            ],
            "common": [
                1,
                2,
                3,
                4,
                5
            ]
        },
        {
            "rowHead": "교육 설계",
            "rowspan": 3,
            "secondRow": [
                {
                    "str": "교육과목의 구성이 적절하게 구성되었다.",
                    "choice": 2,
                    "uuid": "14ebb373-eb14-41b2-98f8-8036b2b5b942"
                },
                {
                    "str": "교과목의 강의사간 배분이 적절하였다.",
                    "choice": 1,
                    "uuid": "26678dce-c3d5-423e-a6db-9efff495b708"
                },
                {
                    "str": "교육목표에 부합하는 적절한 교육기간이었다.",
                    "choice": 1,
                    "uuid": "478134e1-b80a-44bd-adc6-b7c2b4acafd5"
                }
            ],
            "common": [
                1,
                2,
                3,
                4,
                5
            ]
        },
        {
            "rowHead": "교수방법",
            "rowspan": 4,
            "secondRow": [
                {
                    "str": "교육내용에 따라 적절한 교수법이 활용되었다. ",
                    "choice": 2,
                    "uuid": "a8e96b86-eeed-4f5b-9a1a-2118df7803ce"
                },
                {
                    "str": "교육자료는 수업내용 이해에 도움이 되었다.",
                    "choice": 2,
                    "uuid": "02c182cd-3cc8-4ac9-8431-47cf93fece17"
                },
                {
                    "str": "다양한 정보와 현장자료가 활용되었다.",
                    "choice": 1,
                    "uuid": "0b6c9fbf-76db-480e-8bb2-c19cc0f76f45"
                },
                {
                    "str": "교재가 교육내용에 적합하도록 구성되었다.",
                    "choice": 1,
                    "uuid": "fe22c73f-976d-4ad9-9946-4a640a30f37e"
                }
            ],
            "common": [
                1,
                2,
                3,
                4,
                5
            ]
        },
        {
            "rowHead": "강의환경",
            "rowspan": 4,
            "secondRow": [
                {
                    "str": "강의실의 규모와 수강인원은 적절하였다.",
                    "choice": 2,
                    "uuid": "838fadb3-a194-40b3-8522-9e4c93feaea9"
                },
                {
                    "str": "교육 기자재(마이크 등)는 준비가 잘 되었다.",
                    "choice": 1,
                    "uuid": "e299fccb-49b1-4ad4-9515-4a5fa11e4ee2"
                },
                {
                    "str": "강의환경(소음, 조명, 냉난방 등)은 만족스러웠다.",
                    "choice": 2,
                    "uuid": "0ef33130-bd8e-4b89-a98f-ab23d818c3f2"
                },
                {
                    "str": "기타 편의시설(휴게시설, 상담실 등) 이용이 편리하다",
                    "choice": 1,
                    "uuid": "00ed29de-7bb4-409f-a7cd-74740789d8c5"
                }
            ],
            "common": [
                1,
                2,
                3,
                4,
                5
            ]
        },
        {
            "rowHead": "학습 효과 인식도",
            "rowspan": 4,
            "secondRow": [
                {
                    "str": "본인은 학습목표를 충분히 달성하였다. ",
                    "choice": 2,
                    "uuid": "391aba90-ef63-4198-a6fa-c6ec36c883cb"
                },
                {
                    "str": "배워야 할 내용을 충분히 습득하였다.",
                    "choice": 2,
                    "uuid": "48ba5991-140e-4d68-b8bd-e26f42f47396"
                },
                {
                    "str": "학습한 내용이 업무수행에 도움이 될 것이다. ",
                    "choice": 1,
                    "uuid": "d3f484cb-9def-4ef5-9fac-5158a93e8976"
                },
                {
                    "str": "본 과정을 다른 동료에게 적극 추천하고 싶다.",
                    "choice": 1,
                    "uuid": "64a39c3c-53e0-4a95-b9ac-20282d425a4a"
                }
            ],
            "common": [
                1,
                2,
                3,
                4,
                5
            ]
        },
        {
            "rowHead": "교육 처리 과정",
            "rowspan": 4,
            "secondRow": [
                {
                    "str": "홈페이지에서 교육신청시 이용이 편리하다.",
                    "choice": 4,
                    "uuid": "3aa5dca7-0807-40dd-9570-fae339739a3e"
                },
                {
                    "str": "교육접수, 입교안내 등 교육업무 처리가 신속하다.",
                    "choice": 3,
                    "uuid": "52388f28-9555-421e-a930-07f243d0a115"
                },
                {
                    "str": "필요시 교육행정직원과의 접촉이 용이하다.",
                    "choice": 3,
                    "uuid": "8c07352a-92df-4254-a097-a5196c2412b2"
                },
                {
                    "str": "교육행정직원의 은대태도가 친절하다. ",
                    "choice": 3,
                    "uuid": "f6068fa9-ab69-467c-b09c-9f635c6aa963"
                }
            ],
            "common": [
                1,
                2,
                3,
                4,
                5
            ]
        }
    ],
    "item3Desc": "이번 교육과정에서 아래 과목별 강사의 강의에 대한 설문입니다. ",
    "item3Col": [
        {
            "str": "교과목",
            "colspan": 1,
            "uuid": "b40f42f0-d8b8-4e0d-bfcc-1491fe5a7130",
            "common": [
                1,
                2,
                3,
                4,
                5
            ]
        },
        {
            "str": "강사는 해당 과목과 관련된 분야의 전문지식이 풍부하였다. [강의 전문성]",
            "colspan": 5,
            "uuid": "2d95d4f2-b296-44d5-9e60-9ec2d0ebb81b",
            "common": [
                1,
                2,
                3,
                4,
                5
            ]
        },
        {
            "str": "강사는 강의내용을 체계적으로 이해하기 쉽게 전달하였다. [강의 기술] ",
            "colspan": 5,
            "uuid": "74d86929-9c4d-49c9-b225-b91a204156f9",
            "common": [
                1,
                2,
                3,
                4,
                5
            ]
        },
        {
            "str": "강사는 적극적인 자세로 충실하게 강의하였다. [강의 태도]",
            "colspan": 5,
            "uuid": "2d1592e6-b95c-4544-8e09-77d176902c66",
            "common": [
                1,
                2,
                3,
                4,
                5
            ]
        },
        {
            "str": "강사는 학습자들의 적극적인 참여를 유도하였다. [참여도 제고]",
            "colspan": 5,
            "uuid": "52dc7558-fb31-4583-a46c-223110e0d317",
            "common": [
                1,
                2,
                3,
                4,
                5
            ]
        }
    ],
    "item3Row": [
        {
            "str": "수로측량",
            "choice": [
                2,
                1,
                1,
                3
            ],
            "uuid": "345b3a5b-3a73-484a-920e-53cd3bf2407a"
        },
        {
            "str": "해양지구 물리탐사",
            "choice": [
                3,
                2,
                2,
                2
            ],
            "uuid": "13a8cf30-2105-49c0-b96f-aa99baebff68"
        },
        {
            "str": "전자해도",
            "choice": [
                4,
                3,
                3,
                1
            ],
            "uuid": "a6932f97-1720-43ce-a2a7-f58bbecdaa21"
        },
        {
            "str": "해양 조사법규",
            "choice": [
                5,
                4,
                4,
                2
            ],
            "uuid": "4bee9076-7991-4f72-a6cf-42646fcb6a1e"
        },
        {
            "str": "전자해도",
            "choice": [
                1,
                5,
                5,
                3
            ],
            "uuid": "ae220002-b980-4387-bdee-8f5666dc2e00"
        },
        {
            "str": "해양 조사법규",
            "choice": [
                2,
                4,
                4,
                4
            ],
            "uuid": "74195d3d-d562-491a-86be-ad3c41e9a21e"
        },
        {
            "str": "해양 조사정책",
            "choice": [
                3,
                3,
                3,
                5
            ],
            "uuid": "43c99ffa-6058-4615-acbc-3b4f5385b05d"
        },
        {
            "str": "해양 공간정보",
            "choice": [
                5,
                2,
                2,
                4
            ],
            "uuid": "2517c2db-536c-4583-abd4-ff9431bb67d8"
        },
        {
            "str": "해양관측",
            "choice": [
                1,
                1,
                1,
                3
            ],
            "uuid": "4c0bbb96-efbb-4977-88d1-10ec261102f4"
        },
        {
            "str": "항해용 간행물",
            "choice": [
                2,
                5,
                2,
                2
            ],
            "uuid": "05d595f7-eecc-48a7-950b-0285dce1540b"
        },
        {
            "str": "현장실습",
            "choice": [
                3,
                3,
                3,
                1
            ],
            "uuid": "4460ef20-a087-4d25-b0f8-d15ab96039ce"
        },
        {
            "str": "해양예보",
            "choice": [
                4,
                4,
                5
            ],
            "uuid": "b21541e7-d448-42ac-87b2-da7ce4ebb584"
        }
    ],
    "item4Desc": "\"교육과정 운영에 있어서 개선사항이 있으시면 기술하여 주십시오\"",
    "item4Input": {
        "type": "input",
        "text": "asdlfkjasldkfj\nasldkfjalsdf\nasdfkljfsda\n"
    }
}];

function formDefault(survey) {
    //info: "item1" in survey
    const item1 = survey.map((userSurvey, idx) => {
        // "item1": [
        //     {
        //         "itemName": "성별",
        //         "uuid": "f7b656ba-17ca-47ae-a8f1-61f4803e1bb8",
        //         "selection": [
        //             " 남",
        //             " 여"
        //         ],
        //         "answer": 2
        //     },
        // {
        //     "itemName": "연령",
        //     "uuid": "6315e384-9cc9-4e44-8909-9d698b607495",
        //     "selection": [
        //         "  30세 이하",
        //         " 31~35세",
        //         " 36~40세",
        //         " 41~45세",
        //         " 46~50세",
        //         "51세 이상"
        //     ],
        //     "answer": 2
        // },
        // {
        //     "itemName": "최종 학력",
        //     "uuid": "97fe2787-b5ad-4897-93eb-c14f0f9b5923",
        //     "selection": [
        //         "  고등학교졸업",
        //         " 전문학사",
        //         " 학사",
        //         " 석사",
        //         " 박사"
        //     ],
        //     "answer": 1
        // },
        // {
        //     "itemName": "소속 기관",
        //     "uuid": "83d41ba5-a591-48d3-be65-815b5fd5660f",
        //     "selection": [
        //         "  수로측량업체",
        //         " 해양관측업체",
        //         " 해도제작업체",
        //         " 그 외(__)"
        //     ],
        //     "answer": 3
        // },
        // {
        //     "itemName": "직위",
        //     "uuid": "de82f06f-14de-4908-bfbe-8b994e38d6fa",
        //     "selection": [
        //         "  사원",
        //         " 대리",
        //         " 과장",
        //         " 차장",
        //         " 부장",
        //         " 임원"
        //     ],
        //     "answer": 2
        // },
        // {
        //     "itemName": "수로분야 기술등급",
        //     "uuid": "ab551977-c488-4c5c-ad62-5d761ac061a8",
        //     "selection": [
        //         "  초급",
        //         " 중급",
        //         " 고급",
        //         " 특급"
        //     ],
        //     "answer": 1
        // },
        // {
        //     "itemName": "총근무년수",
        //     "uuid": "38445c36-2a98-4012-989b-5c1102429f58",
        //     "selection": [
        //         "  1년 이하",
        //         " 2~5년",
        //         " 6~10년",
        //         " 11~15년",
        //         " 16~20년",
        //         " 21년 이상"
        //     ],
        //     "answer": 4
        // }

        const itemList = userSurvey.item1.map((item) => item.itemName);

        const result = itemList.map((itemName) => {
            const objs = userSurvey.item1.filter((item) => item.itemName === itemName);
            const obj = objs[0]
            return obj.selection[obj.answer - 1];
        });

        const form = ['sex', 'age', 'educationLevel', 'belongs', 'position', 'techLevel', 'yearOfService'];
        return form.reduce((acc, k, idx) => {
            acc[k] = result[idx];
            return acc;
        }, new Map());

    })

    console.log('item1', item1)
    return item1;
}

export default async function makeSurveyResult(survey) {

    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");

    const workbook = new ExcelJS.Workbook();
    workbook.creator = '';
    workbook.lastModifiedBy = '';
    workbook.created = new Date();
    workbook.modified = new Date();
    workbook.lastPrinted = new Date();

    const ws_default = workbook.addWorksheet('기본 항목');

    ws_default.columns = [
        { header: "순서", key: 'order', width: 10 },
        { header: "성별", key: 'sex', width: 10 },
        { header: "연령", key: 'age', width: 10 },
        { header: "최종학력", key: 'educationLevel', width: 10 },
        { header: "소속기관", key: 'belongs', width: 10 },
        { header: "직위", key: 'position', width: 10 },
        { header: "기술등급", key: 'techLevel', width: 10 },
        { header: "총 근무년수", key: 'yearOfService', width: 10 },
    ];


    const ws_default_vals = formDefault(survey);
    console.log('ws_default_vals', ws_default_vals);
    ws_default_vals.map(({ sex, age, educationLevel, belongs, position, techLevel, yearOfService }, order) => {
        console.log("idx", order)
        ws_default.addRow({order: order+1, sex, age, educationLevel, belongs, position, techLevel, yearOfService })
    })

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, 'surveyResult.xlsx');
}