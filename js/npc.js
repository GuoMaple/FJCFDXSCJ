// NPC数据库
const npcDatabase = [
    {
        name: "校草",
        icon: "fas fa-user",
        interactions: [
            {
                description: "校草和你打招呼，你感到非常开心。",
                effect: { social: 10 }
            },
            {
                description: "校草和你聊了聊学习，你学到了一些学习方法。",
                effect: { intelligence: 8, social: 5 }
            },
            {
                description: "校草邀请你参加他的生日派对，你拒绝了。",
                effect: { social: -3 }
            },
            {
                description: "校草向你借了一些钱，他承诺会还。",
                effect: { money: -20, social: 5 }
            }
        ]
    },
    {
        name: "校霸",
        icon: "fas fa-user-secret",
        interactions: [
            {
                description: "校霸向你要保护费，你给了他。",
                effect: { money: -30, social: -5 }
            },
            {
                description: "校霸和你打了一架，你受伤了。",
                effect: { health: -20, social: -10 }
            },
            {
                description: "你和校霸成为了朋友，他教你一些格斗技巧。",
                effect: { health: 15, social: 8 }
            },
            {
                description: "校霸帮你解决了一个问题，你很感激。",
                effect: { social: 15 }
            }
        ]
    },
    {
        name: "学霸",
        icon: "fas fa-graduation-cap",
        interactions: [
            {
                description: "学霸和你一起学习，你学到了很多知识。",
                effect: { intelligence: 15, credit: 5 }
            },
            {
                description: "学霸向你借了一些钱，他很快就还了。",
                effect: { money: -10, social: 5 }
            },
            {
                description: "学霸邀请你参加他的学习小组，你拒绝了。",
                effect: { social: -3 }
            },
            {
                description: "学霸给你一些学习资料，你很感激。",
                effect: { intelligence: 10, social: 5 }
            }
        ]
    },
    {
        name: "校花都",
        icon: "fas fa-user-nurse",
        interactions: [
            {
                description: "校花和你聊天，你感到很开心。",
                effect: { social: 12, intelligence: 3 }
            },
            {
                description: "校花请你喝奶茶，你很感激。",
                effect: { health: 10, social: 8 }
            },
            {
                description: "你向校花表白，她拒绝了。",
                effect: { social: -8, health: -5 }
            },
            {
                description: "校花和你一起参加活动，你表现得很好。",
                effect: { social: 15, intelligence: 5 }
            }
        ]
    },
    {
        name: "辅导员",
        icon: "fas fa-chalkboard-teacher",
        interactions: [
            {
                description: "辅导员和你谈心，你感到很温暖。",
                effect: { health: 15, social: 8 }
            },
            {
                description: "辅导员给你一些建议，你受益匪浅。",
                effect: { intelligence: 10, credit: 5 }
            },
            {
                description: "辅导员批评了你，你感到很沮丧。",
                effect: { social: -8, health: -5 }
            },
            {
                description: "辅导员帮你解决了一个问题，你很感激。",
                effect: { social: 12, credit: 3 }
            }
        ]
    },
    {
        name: "宿管阿姨",
        icon: "fas fa-female",
        interactions: [
            {
                description: "宿管阿姨给你一些零食，你很感激。",
                effect: { health: 10, social: 5 }
            },
            {
                description: "宿管阿姨和你聊天，你感到很温暖。",
                effect: { health: 8, social: 5 }
            },
            {
                description: "你晚归被宿管阿姨批评，你感到很沮丧。",
                effect: { social: -5, health: -3 }
            },
            {
                description: "宿管阿姨帮你收快递，你很感激。",
                effect: { social: 8, health: 5 }
            }
        ]
    },
    {
        name: "食堂阿姨",
        icon: "fas fa-utensils",
        interactions: [
            {
                description: "食堂阿姨多给了你一些菜，你很感激。",
                effect: { health: 15, social: 5 }
            },
            {
                description: "你和食堂阿姨聊天，她给你一些生活建议。",
                effect: { social: 8, intelligence: 3 }
            },
            {
                description: "你对食堂的饭菜不满意，和阿姨发生了争执。",
                effect: { social: -8, health: -5 }
            },
            {
                description: "食堂阿姨给你一些免费的汤，你很感激。",
                effect: { health: 10, social: 5 }
            }
        ]
    },
    {
        name: "图书馆管理员",
        icon: "fas fa-book",
        interactions: [
            {
                description: "图书馆管理员帮你找书，你很感激。",
                effect: { intelligence: 10, social: 5 }
            },
            {
                description: "你和图书馆管理员聊天，他给你一些学习建议。",
                effect: { intelligence: 12, social: 3 }
            },
            {
                description: "你在图书馆大声说话，被管理员批评了。",
                effect: { social: -5, intelligence: -3 }
            },
            {
                description: "图书馆管理员推荐你一些好书，你很感激。",
                effect: { intelligence: 15, social: 5 }
            }
        ]
    },
    {
        name: "保安",
        icon: "fas fa-shield-alt",
        interactions: [
            {
                description: "保安帮你找回了丢失的物品，你很感激。",
                effect: { social: 10, health: 5 }
            },
            {
                description: "你和保安聊天，他给你一些安全建议。",
                effect: { social: 5, intelligence: 3 }
            },
            {
                description: "你忘记带学生证，被保安拦在门外。",
                effect: { social: -5, health: -3 }
            },
            {
                description: "保安帮你搬东西，你很感激。",
                effect: { social: 8, health: 5 }
            }
        ]
    },
    {
        name: "快递员",
        icon: "fas fa-truck",
        interactions: [
            {
                description: "快递员给你送来了快递，你很开心。",
                effect: { social: 5, health: 5 }
            },
            {
                description: "你和快递员聊天，他给你一些生活建议。",
                effect: { social: 8, intelligence: 3 }
            },
            {
                description: "你的快递丢失了，你很沮丧。",
                effect: { social: -8, health: -5, money: -20 }
            },
            {
                description: "快递员给你一些小礼品，你很感激。",
                effect: { social: 10, health: 5 }
            }
        ]
    }
];

// 与NPC互动
function interactWithNPC(npcName) {
    // 检查是否已经互动过
    if (gameState.interactedNPCs.includes(npcName)) {
        showNotification("你已经和这个NPC互动过了！");
        return;
    }
    
    // 查找NPC
    const npc = gameState.weeklyNPCs.find(n => n.name === npcName);
    if (!npc) return;
    
    // 随机选择一个互动结果
    const interaction = npc.interactions[Math.floor(Math.random() * npc.interactions.length)];
    
    // 应用效果
    applyEffects(interaction.effect);
    
    // 记录互动
    gameState.interactedNPCs.push(npcName);
    gameState.weeklyActions.push(`与${npcName}互动: ${interaction.description}`);
    gameState.semesterNPCInteractions++;
    
    // 显示结果
    showEventResult(`与${npcName}互动`, interaction.description);
    
    // 更新UI
    updateUI();
    
    // 检查是否完成所有NPC互动
    if (gameState.interactedNPCs.length >= gameState.weeklyNPCs.length) {
        setTimeout(() => {
            showNotification("你完成了所有NPC互动，获得额外奖励！");
            applyEffects({ social: 10, intelligence: 5 });
            updateUI();
        }, 1000);
    }
}

// 显示NPC互动区域
function showNPCInteractionArea() {
    const container = document.getElementById('npc-interactions');
    container.innerHTML = '';
    
    gameState.weeklyNPCs.forEach(npc => {
        const isInteracted = gameState.interactedNPCs.includes(npc.name);
        
        const npcElement = document.createElement('div');
        npcElement.className = 'action-btn npc-action';
        npcElement.style.display = 'flex';
        npcElement.style.alignItems = 'center';
        npcElement.style.justifyContent = 'space-between';
        npcElement.innerHTML = `
            <span><i class="${npc.icon}"></i> ${npc.name}</span>
            ${isInteracted ? '<i class="fas fa-check" style="color: #4caf50;"></i>' : ''}
        `;
        
        if (!isInteracted) {
            npcElement.addEventListener('click', function() {
                interactWithNPC(npc.name);
            });
        } else {
            npcElement.classList.add('used');
        }
        
        container.appendChild(npcElement);
    });
    
    document.getElementById('npc-interaction-area').style.display = 'block';
}