const cardData = require('trelloCardsData.json');

const teamMembers = [
    {
        name: "Leonardo Vinci",
        trello_id: "61f6183fe803bd5eee4e525c",
        position: "UX/UI Design",
        phone: "111-111-1111",
        email: "test@test.com",
        office_status: ""
    },
    {
        name: "Raphael Urbino",
        trello_id: "5ad3c6e888a4bb8ba338d865",
        position: "Senior Back-End Dev",
        phone: "111-111-1111",
        email: "test@test.com",
        office_status: ""
    },
    {
        name: "Donatello Bardi",
        trello_id: "63818b174ca8dc0583fba83d",
        position: "Junior Back-End Dev",
        phone: "111-111-1111",
        email: "test@test.com",
        office_status: ""
    },
    {
        name: "Michelangelo Simoni",
        trello_id: "61f61858a589f81b521b717a",
        position: "Front-End Dev",
        phone: "111-111-1111",
        email: "test@test.com",
        office_status: "OOO.0705"
    },
    {
        name: "April O'Neil",
        trello_id: "63818bb01c409500fb72304e",
        position: "Dev Lead",
        phone: "111-111-1111",
        email: "test@test.com",
        office_status: "OOO.0705"
    }
];

let allCards = [];

// Phase count HTML elements
let elToDoCount = document.getElementById('toDoCount'),
    elPhaseOneCount = document.getElementById('phaseOneCount'),
    elPhaseTwoCount = document.getElementById('phaseTwoCount'),
    elPhaseThreeCount = document.getElementById('phaseThreeCount'),
    elQACount = document.getElementById('qaCount'),
    elCompleteCount = document.getElementById('completeCount');

// Phase Totals
let toDoCount = 0,
    phaseOneCount = 0,
    phaseTwoCount = 0,
    phaseThreeCount = 0,
    qaCount = 0,
    completeCount = 0;

// Department Totals
let adminCount = 0,
    devCount = 0,
    hrCount = 0,
    itCount = 0,
    productionCount = 0,
    salesCount = 0;

addSprintChartXAxisScale = (sprintTaskCompletionTotals, sprintChartList) => {
    const highestTaskCompletionTotal = Math.max(...sprintTaskCompletionTotals),
        scaleHigh = highestTaskCompletionTotal+3;
    
    let sprintChartScaleLI = document.createElement('li'),
        sprintChartScaleContainer = document.createElement('ul');

    sprintChartScaleLI.setAttribute('class','sprintChartList__scale');

    for (let i = 1; i < scaleHigh; i++) {
        let scaleNumberLI = document.createElement('li');
        scaleNumberLI.setAttribute('class','scaleLI');
        scaleNumberLI.innerHTML = i;
        sprintChartScaleContainer.appendChild(scaleNumberLI);
    }
    
    sprintChartScaleLI.appendChild(sprintChartScaleContainer);
    sprintChartList.insertBefore(sprintChartScaleLI, sprintChartList.firstChild);
    setScaleAndRunnerWidth(scaleHigh);
}

calcDepartmentTotals = (card) => {
    let cardLabels = card.labels;
    cardLabels.forEach(label => {
        let department = label.name;
        if(department==='Admin') {
            adminCount++;
        } else if(department==='Dev') {
            devCount++;
        } else if(department==='HR') {
            hrCount++;
        } else if(department==='IT') {
            itCount++;
        } else if(department==='Production') {
            productionCount++;
        } else if(department==='Sales') {
            salesCount++;
        }
    });
}

calcPhaseTotals = (card) => {
    let cardListID = card.idList;
    if(cardListID==='5ad3c6eb79d93844dc6b0b40') {
        toDoCount++;
    } else if(cardListID==='61f613024aa7d53bc468757b') {
        phaseOneCount++;
    } else if(cardListID==='61f61307219e3e3bda928af0') {
        phaseTwoCount++;
    } else if(cardListID==='61f6130c6e9f198e257e8cb2') {
        phaseThreeCount++;
    } else if(cardListID==='5ad3c6eb79d93844dc6b0b42') {
        qaCount++;
    } else if(cardListID==='5ad3c6eb79d93844dc6b0b41') {
        completeCount++;
    }
}

clearRunnerAnimations = () => {
    let runners = document.querySelectorAll('.sprintChartList__runner--invisible');
    let runnerContainers = document.querySelectorAll('.sprintChartList__runner-container');
    runners.forEach(runner => {
        runner.innerHTML = '';
        runner.classList.remove('sprintChartList__runner--invisible');
    });
    runnerContainers.forEach(containerUL => {
        let lis = containerUL.children,
            lisLength = lis.length,
            lastRunner = lis[lisLength-1];
        if(lastRunner) {
            lastRunner.classList.add('sprintChartList__runner--last');
        }
    })
}

getDateToday = () => {
    let today = new Date();
    today = today.toLocaleDateString();

    [...document.querySelectorAll('.date-today')].forEach(dateTodaySpan => {
        dateTodaySpan.innerHTML = today
    });
}

fillDepartmentWorkloadChart = (adminCount, devCount, hrCount, itCount, productionCount, salesCount) => {
    const ctx = document.getElementById('departmentWorkloadChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [
              ' Admin',
              ' Dev',
              ' HR',
              ' IT',
              ' Production',
              ' Sales'
            ],
            font: {
                size: 22
            },
            datasets: [{
              data: [adminCount, devCount, hrCount, itCount, productionCount, salesCount],
              backgroundColor: [
                'RGBA(64, 181, 116, 1)',
                'RGBA(64, 185, 148, 1)',
                'RGBA(64, 189, 182, 1)',
                'RGBA(66, 167, 192, 1)',
                'RGBA(68, 138, 194, 1)',
                'RGBA(70, 109, 196, 1)'
              ],
              borderColor: 'rgba(240,240,240,0.65)',
              borderWidth: 1.5,
              borderJoinStyle: 'bevel',
              hoverBorderColor: '#ffffff',
              hoverBorderWidth: 3
            }]
        },
        options: {
            animation: {
                duration: 4000
            },
            plugins: {
                legend: {
                    position: 'right',
                    font: {
                        size: 20
                    }
                }
            }
        }
    });
}

fillProductionPhaseDataList = () => {
    elToDoCount.innerHTML = toDoCount;
    elPhaseOneCount.innerHTML = phaseOneCount;
    elPhaseTwoCount.innerHTML = phaseTwoCount;
    elPhaseThreeCount.innerHTML = phaseThreeCount;
    elQACount.innerHTML = qaCount;
    elCompleteCount.innerHTML = completeCount;
    fillGoalBar();
}

fillRunnerContainer = (numberOfRunners, runnerContainer) => {
    for (let i = 0; i < numberOfRunners; i++) {
        let runner = document.createElement('li'),
            runnerDust = document.createElement('div');
        runner.setAttribute('class','sprintChartList__runner sprintChartList__runner--invisible');
        runnerDust.setAttribute('class','sprintChartList__runner-dust');
        runnerDust.innerHTML = 'o0o0o0o';
        runner.appendChild(runnerDust);
        runnerContainer.appendChild(runner);
    }
} 

let sprintTaskCompletionTotals = [];
fillSprintChart = () => {
    const sprintChartList = document.getElementById('sprintChartList');

    teamMembers.forEach(member => {
        let memberNameSpan = '<span class="sprintChartList__member-name">'+member.name+'</span>',
            memberTrelloID = member.trello_id,
            sprintTasksComplete = 0,
            sprintChartLI = document.createElement('li'),
            runnerContainer = document.createElement('ul'),
            runner = document.createElement('li');
            
        sprintChartLI.setAttribute('class','sprintChartList__li');
        sprintChartLI.innerHTML = memberNameSpan;
        runnerContainer.setAttribute('class','sprintChartList__runner-container');
        runner.setAttribute('class','sprintChartList__runner');

        allCards.forEach(card => {
            let cardMembers = card.idMembers,
                cardList = card.idList;
            
            if(cardList==='5ad3c6eb79d93844dc6b0b41') {
                cardMembers.forEach(memberID => {
                    if(memberID===memberTrelloID) {
                        sprintTasksComplete++;
                    }
                })
            }
        });

        fillRunnerContainer(sprintTasksComplete, runnerContainer);
        sprintChartLI.appendChild(runnerContainer);
        sprintChartList.appendChild(sprintChartLI);
        sprintTaskCompletionTotals.push(sprintTasksComplete);
    });
}

fillGoalBar = () => {
    const remainingToGoal = document.getElementById('remainingToGoal');
    const progressGoalBar = document.getElementById('progressGoalBar');
    const inProgressBar = document.getElementById('inProgressBar');
    const toDoBar = document.getElementById('toDoBar');
    let totalCards = allCards.length;
    let inProgressCount = totalCards-completeCount-toDoCount;
    let goal = document.getElementById('goal').innerText;
    let remaining = goal-completeCount;
    let completePercentage = (completeCount/totalCards)*100;
    let inProgressPercentage = (inProgressCount/totalCards)*100;
    let toDoPercentage = 100-completePercentage-inProgressPercentage;

    remainingToGoal.innerHTML = remaining;
    progressGoalBar.setAttribute('style', 'width: '+completePercentage+'%');
    inProgressBar.setAttribute('style', 'width: '+inProgressPercentage+'%');
    toDoBar.setAttribute('style', 'width: '+toDoPercentage+'%');
}

makePhaseChart = () => {
    fillProductionPhaseDataList();
    const ctx = document.getElementById('productionPhaseChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['To Do', 'Design', 'Phase 1', 'Phase 2', 'Phase 3', 'QA/QC', 'Complete'],
            datasets: [
                {
                    label: ' Filter A',
                    animations: {
                        y: { delay: 1000, duration: 3000 }
                    },
                    data: [toDoCount-6, 4, phaseOneCount+2, phaseTwoCount+8, phaseThreeCount, qaCount+3, completeCount-9],
                    borderColor: '#ff0000',
                    borderDash: [5, 5],
                    borderWidth: 1
                }, {
                    label: ' Filter B',
                    animations: {
                        y: { delay: 500, duration: 3000 }
                    },
                    data: [toDoCount-3, 1, phaseOneCount+2, phaseTwoCount, phaseThreeCount-3, qaCount+1, completeCount-6],
                    borderColor: '#ffca2c',
                    borderWidth: 2
                }, {
                    label: ' Main',
                    animations: {
                        y: { duration: 3000 }
                    },
                    data: [toDoCount, 0, phaseOneCount, phaseTwoCount, phaseThreeCount, qaCount, completeCount],
                    backgroundColor: 'rgba(0,50,100,0.35)',
                    borderColor: '#d8d8d8',
                    borderWidth: 1,
                    fill: true
                }
            ]
        },
        options: {
            animations: {
              y: {
                easing: 'easeInOutElastic',
                from: (ctx) => {
                  if (ctx.type === 'data') {
                    if (ctx.mode === 'default' && !ctx.dropped) {
                      ctx.dropped = true;
                      return 0;
                    }
                  }
                }
              }
            },
            plugins: {
                legend: {
                    position: 'right',
                    padding: {top: 0, left: 30, right: 30, bottom: 0},
                    labels: {
                        color: '#000000',
                        font: {
                            family: 'Prompt',
                            size: 16,
                            weight: 200
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#000000',
                        font: {
                            family: 'Prompt',
                            size: 18,
                            weight: 200
                        }
                    }
                },
                y: { display: false }
            }
        }
    });
}

setScaleAndRunnerWidth = (scaleHigh) => {
    const x = parseInt(scaleHigh);
    const runnerWidth = 100/x;
    [...document.querySelectorAll('.sprintChartList__runner')].forEach(runnerLIItem => {
        runnerLIItem.style.width = runnerWidth+'%';
    });
    [...document.querySelectorAll('.scaleLI')].forEach(scaleLI => {
        scaleLI.style.width = runnerWidth+'%';
    });
    setTimeout(clearRunnerAnimations,3000);
}

// Trello.get('boards/QCJDklm5/cards', function(cards) {
//     $.each(cards, function(ix, card) {
//         calcPhaseTotals(card);
//         calcDepartmentTotals(card);
//         allCards.push(card);
//     })
//     getDateToday();
//     makePhaseChart();
//     fillSprintChart();
//     populateEmployeeBreakdownTabs();
//     checkForEmptyEmployeePhaseLists();
// }, function (error){
//     console.log(error);
// });

cardData.forEach(card => {
    calcPhaseTotals(card);
    calcDepartmentTotals(card);
    allCards.push(card);
})

getDateToday();
makePhaseChart();
fillSprintChart();
populateEmployeeBreakdownTabs();
checkForEmptyEmployeePhaseLists();
    
// OLD LAZY LOAD FOR DEPARTMENT WORKLOAD AND SPRINT CHARTS, REPLACED WITH WINDOW.ONSCROLL BELOW -221201
// -----------------------------------------------------------------------------------------------------
// document.addEventListener("DOMContentLoaded", function() {
//     var lazyloadGraph = document.getElementById('chartTrigger');    
//     var lazyloadThrottleTimeout;
    
//     function lazyload () {
//         if(lazyloadThrottleTimeout) {
//             clearTimeout(lazyloadThrottleTimeout);
//         }    
            
//         lazyloadThrottleTimeout = setTimeout(function() {
//             var scrollTop = window.pageYOffset;
//             if(lazyloadGraph.offsetTop < (window.innerHeight + scrollTop)) {
//                 addSprintChartXAxisScale(sprintTaskCompletionTotals, sprintChartList);
//                 fillDepartmentWorkloadChart(adminCount, devCount, hrCount, itCount, productionCount, salesCount);
//                 document.removeEventListener("scroll", lazyload);
//                 window.removeEventListener("resize", lazyload);
//                 window.removeEventListener("orientationChange", lazyload);
//             }
//         }, 20);
//     }
    
//     document.addEventListener("scroll", lazyload);
//     window.addEventListener("resize", lazyload);
//     window.addEventListener("orientationChange", lazyload);
// });
// ---------------------------------------------------------------

// Delayed animation on scroll for Department Workload and Sprint Charts
let hasScrolled = false;
window.onscroll = () => {
    if(!hasScrolled) {
        setTimeout(function() {
            addSprintChartXAxisScale(sprintTaskCompletionTotals, sprintChartList);
            fillDepartmentWorkloadChart(adminCount, devCount, hrCount, itCount, productionCount, salesCount);
        }, 1400);
        hasScrolled = true;
    }
}

/////////////
// Sidebar //
/////////////

const appContainer = document.getElementById('appContainer');
let sideBar = document.querySelector('.side-bar');
let arrowCollapse = document.querySelector('#logo-name__icon');
let dashboardContainer = document.getElementById('dashboardContainer');
sideBar.onclick = () => {
    appContainer.classList.toggle('side-bar-open');
    sideBar.classList.toggle('collapse');
    arrowCollapse.classList.toggle('collapse');
    if (arrowCollapse.classList.contains('collapse')) {
        arrowCollapse.classList = 'fa-solid fa-angles-left collapse';
        dashboardContainer.classList = '';
    } else {
        arrowCollapse.classList = 'fa-solid fa-angles-right';
        dashboardContainer.classList = 'fullsize-dash';
    }
};

////////////////////////
// Employee Breakdown //
////////////////////////

function setAttributes(element, attributes) {
    Object.keys(attributes).forEach(attr => {
        let cleanedAttr = attr.split('_').join('-');
        element.setAttribute(cleanedAttr, attributes[attr]);
    });
}

buildCardAccordion = (e_ID, e_AccordionBody) => {
    const cardAccordion = document.createElement('div'),
    accordionAttrs = {
        id: 'ca_'+e_ID,
        class: 'accordion'
    },
    cardPhases = [
        {
            name: 'To Do',
            id: '5ad3c6eb79d93844dc6b0b40'
        },
        {
            name: 'Design',
            id: ''
        },
        {
            name: 'Phase 1',
            id: '61f613024aa7d53bc468757b'
        },
        {
            name: 'Phase 2',
            id: '61f61307219e3e3bda928af0'
        },
        {
            name: 'Phase 3',
            id: '61f6130c6e9f198e257e8cb2'
        },
        {
            name: 'QA/QC',
            id: '5ad3c6eb79d93844dc6b0b42'
        },
        {
            name: 'Complete',
            id: '5ad3c6eb79d93844dc6b0b41'
        }
    ];
    setAttributes(cardAccordion, accordionAttrs);
    
    cardPhases.forEach((phase, i) => {
        const cpAccordionItem = document.createElement('div'),
            cpAccordionHeader = document.createElement('h2'),
            cpAccordionBtn = document.createElement('button'),
            cpAccordionCounter = document.createElement('span'),
            cpAccordionCollapse = document.createElement('div'),
            cpAccordionBody = document.createElement('div'),
            
            headerAttrs = {
                id: 'heading' + e_ID + i,
                class: 'accordion-header'
            },    
            btnAttrs = {
                data_bs_toggle: 'collapse',
                data_bs_target: '#collapse' + e_ID + i,
                aria_expanded: 'true',
                aria_controls: 'collapse' + e_ID + i
            },
            counterAttrs = {
                id: 'cardPhaseCounter' + e_ID + i,
                class: 'card-phase-counter'
            }
            collapseAttrs = {
                id: 'collapse' + e_ID + i,
                aria_labeledby: 'heading' + e_ID + i,
                data_bs_parent: '#ca_' + e_ID
            }, 
            bodyAttrs = {
                id: 'cpab_' + e_ID + i,
                class: 'accordion-body'
            };

        // Add Bootstrap accordion classes
        cpAccordionItem.setAttribute('class', 'accordion-item');
        cpAccordionBtn.classList.add('accordion-button', 'collapsed');
        cpAccordionCollapse.classList.add('accordion-collapse', 'collapse');

        setAttributes(cpAccordionHeader, headerAttrs);
        setAttributes(cpAccordionBtn, btnAttrs);
        setAttributes(cpAccordionCounter, counterAttrs);
        setAttributes(cpAccordionCollapse, collapseAttrs);
        setAttributes(cpAccordionBody, bodyAttrs);

        cpAccordionItem.append(cpAccordionHeader, cpAccordionCollapse);
        cpAccordionHeader.appendChild(cpAccordionBtn);
        cpAccordionCollapse.appendChild(cpAccordionBody);
        
        cpAccordionCounter.innerHTML = 0;
        cpAccordionBtn.innerHTML = phase.name;
        cpAccordionBtn.prepend(cpAccordionCounter);
        cpUL = document.createElement('ul');
        cpUL.classList.add('employee-phase-list');
        cpAccordionBody.appendChild(cpUL);

        cardAccordion.appendChild(cpAccordionItem);
    })

    e_AccordionBody.appendChild(cardAccordion);
}

tieCardsToEmployee = () => {
    teamMembers.forEach(async(employee, i) => {
        const e_ID = employee.trello_id,
            e_AccordionBodyID = 'e'+i,
            e_AccordionBody = document.getElementById(e_AccordionBodyID);

        buildCardAccordion(e_ID, e_AccordionBody);
            
        const e_ToDoListID = await 'cpab_'+e_ID+'0',
            e_ToDoList = document.getElementById(e_ToDoListID).querySelector('ul'),
            e_ToDoCounter = document.getElementById('cardPhaseCounter'+e_ID+'0'),
            // e_DesignListID = 'cpab_'+e_ID+'0',
            // e_DesignList = document.getElementById(e_DesignListID).querySelector('ul'),
            // e_DesignCounter = ,
            e_Phase1ListID = 'cpab_'+e_ID+'2',
            e_Phase1List = document.getElementById(e_Phase1ListID).querySelector('ul'),
            e_Phase1Counter = document.getElementById('cardPhaseCounter'+e_ID+'2'),
            e_Phase2ListID = 'cpab_'+e_ID+'3',
            e_Phase2List = document.getElementById(e_Phase2ListID).querySelector('ul'),
            e_Phase2Counter = document.getElementById('cardPhaseCounter'+e_ID+'3'),
            e_Phase3ListID = 'cpab_'+e_ID+'4',
            e_Phase3List = document.getElementById(e_Phase3ListID).querySelector('ul'),
            e_Phase3Counter = document.getElementById('cardPhaseCounter'+e_ID+'4'),
            e_QAQCListID = 'cpab_'+e_ID+'5',
            e_QAQCList = document.getElementById(e_QAQCListID).querySelector('ul'),
            e_QAQCCounter = document.getElementById('cardPhaseCounter'+e_ID+'5'),
            e_CompleteListID = 'cpab_'+e_ID+'6',
            e_CompleteList = document.getElementById(e_CompleteListID).querySelector('ul'),
            e_CompleteCounter = document.getElementById('cardPhaseCounter'+e_ID+'6');
        
        let e_Cards = [];

        allCards.forEach(card => {
            
            let cardData = {
                id: card.id,
                client: card.name,
                members: card.idMembers,
                phase: card.idList,
                trello_link: card.shortUrl
            }

            cardData.members.forEach(member => {
                if(e_ID===member) {
                    e_Cards.push(cardData);
                }
            })
        })
        
        e_Cards.forEach(card => {
            const cardLI = document.createElement('li');
            
            cardLI.innerHTML = card.client;

            if(card.phase==='5ad3c6eb79d93844dc6b0b40') {
                e_ToDoList.appendChild(cardLI);
                e_ToDoCounter.innerHTML++;
            } else if(card.phase==='61f613024aa7d53bc468757b') {
                e_Phase1List.appendChild(cardLI);
                e_Phase1Counter.innerHTML++;
            } else if(card.phase==='61f61307219e3e3bda928af0') {
                e_Phase2List.appendChild(cardLI);
                e_Phase2Counter.innerHTML++;
            } else if(card.phase==='61f6130c6e9f198e257e8cb2') {
                e_Phase3List.appendChild(cardLI);
                e_Phase3Counter.innerHTML++;
            } else if(card.phase==='5ad3c6eb79d93844dc6b0b42') {
                e_QAQCList.appendChild(cardLI);
                e_QAQCCounter.innerHTML++;
            } else if(card.phase==='5ad3c6eb79d93844dc6b0b41') {
                e_CompleteList.appendChild(cardLI);
                e_CompleteCounter.innerHTML++;
            }
        })
    })
}

populateEmployeeBreakdownTabs = () => {
    const ebNav = document.getElementById('employeeBreakdownNav'),
    ebTabPanes = document.getElementById('employeeBreakdownTabPanes');
    
    teamMembers.forEach((employee, i) => {
        const eName = employee.name,
        ePosition = employee.position,
        eEmail = employee.email,
        ePhone = employee.phone,
        eNavBtn = document.createElement('button'),
        eTabPane = document.createElement('div');
        
        const btnAttrs = {
            class: 'nav-link',
            'data-bs-toggle': 'tab',
            'data-bs-target': '#e'+i,
            role: 'tab'
        };

        const paneAttrs = {
            id: 'e'+i,
            class: 'tab-pane',
            role: 'tabpanel'
        };
        
        setAttributes(eNavBtn, btnAttrs);
        setAttributes(eTabPane, paneAttrs);
        
        eNavBtn.innerHTML = '<div class="e-name">'+
        eName+
        '</div><div class="e-info"><span>'+
        ePosition+
        '</span><a href="insert-company-internal-message-link-here"><i class="fa-solid fa-comments"></i></a><a href="mailto:'+
        eEmail+
        '"><i class="fa-regular fa-envelope"></i></a><a href="tel:'+
        ePhone+
        '"><i class="fa-solid fa-phone"></i></a></div>';
        
        ebNav.appendChild(eNavBtn);
        ebTabPanes.appendChild(eTabPane);
    })
    tieCardsToEmployee();
}

checkForEmptyEmployeePhaseLists = async () => {
    const employeePhaseLists = await document.querySelectorAll('.employee-phase-list');
    employeePhaseLists.forEach(phaseList => {
        if(phaseList.children.length<1) {
            phaseList.innerText = "This employee has no tasks in this phase at this time."
        }
    })
}