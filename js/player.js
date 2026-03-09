// 角色数据
const characters = [
    {
        id: "shuaizha",
        name: "帅炸",
        description: "创意发明家，擅长改造废品",
        stats: { health: 85, money: 35, credit: 50, intelligence: 45, social: 45 },
        color: "#FF9800",
        icon: "fas fa-lightbulb",
        avatar: "./images/player/shuaizha.jpg"
    },
    {
        id: "changbozi",
        name: "长脖子",
        description: "校园DJ/MC，热爱音乐表演",
        stats: { health: 80, money: 55, credit: 45, intelligence: 50, social: 55 },
        color: "#9C27B0",
        icon: "fas fa-music",
        avatar: "./images/player/changbozi.jpg"
    },
    {
        id: "wangyue",
        name: "望月",
        description: "浪漫主义者，寻找校园恋爱",
        stats: { health: 85, money: 65, credit: 50, intelligence: 45, social: 50 },
        color: "#E91E63",
        icon: "fas fa-heart",
        avatar: "./images/player/wangyue.jpg"
    },
    {
        id: "chengzi",
        name: "橙子哥",
        description: "校园男神，潮流模特",
        stats: { health: 90, money: 60, credit: 45, intelligence: 45, social: 60 },
        color: "#FF5722",
        icon: "fas fa-camera",
        avatar: "./images/player/chengzi.jpg"
    },
    {
        id: "daoyan",
        name: "导演",
        description: "游戏视频创业者",
        stats: { health: 80, money: 35, credit: 55, intelligence: 65, social: 45 },
        color: "#2196F3",
        icon: "fas fa-video",
        avatar: "./images/player/daoyan.jpg"
    },
    {
        id: "datou",
        name: "大头",
        description: "游戏大神，目标PK赛事冠军",
        stats: { health: 75, money: 25, credit: 60, intelligence: 75, social: 35 },
        color: "#4CAF50",
        icon: "fas fa-gamepad",
        avatar: "./images/player/datou.jpg"
    }
];

// 显示角色选择
function showCharacterSelect() {
    const characterList = document.getElementById('character-list');
    characterList.innerHTML = '';
    
    characters.forEach(character => {
        const characterElement = document.createElement('div');
        characterElement.className = 'item';
        characterElement.style.border = `3px solid ${character.color}`;
        characterElement.style.cursor = 'pointer';
        characterElement.innerHTML = `
            <div class="item-icon" style="background: ${character.color}; overflow: hidden;">
                <img src="${character.avatar}" alt="${character.name}" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <div class="item-name">${character.name}</div>
            <div style="font-size: 0.8rem; color: #666; text-align: center; margin-top: 5px;">${character.description}</div>
            <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 5px; margin-top: 10px;">
                <span style="font-size: 0.7rem; background: #ffcdd2; padding: 2px 5px; border-radius: 3px;">生命: ${character.stats.health}</span>
                <span style="font-size: 0.7rem; background: #c8e6c9; padding: 2px 5px; border-radius: 3px;">资金: ${character.stats.money}</span>
                <span style="font-size: 0.7rem; background: #bbdefb; padding: 2px 5px; border-radius: 3px;">学分: ${character.stats.credit}</span>
            </div>
        `;
        
        characterElement.addEventListener('click', function() {
            selectCharacter(character.id);
        });
        
        characterList.appendChild(characterElement);
    });
    
    document.getElementById('character-select-modal').style.display = 'flex';
}

// 选择角色
function selectCharacter(characterId) {
    const character = characters.find(c => c.id === characterId);
    gameState.currentCharacter = character;
    
    // 设置角色属性
    gameState.health = character.stats.health;
    gameState.money = character.stats.money;
    gameState.credit = character.stats.credit;
    gameState.intelligence = character.stats.intelligence;
    gameState.social = character.stats.social;
    
    // 记录学期开始时的数值
    gameState.semesterStartStats = {
        health: character.stats.health,
        money: character.stats.money,
        credit: character.stats.credit,
        intelligence: character.stats.intelligence,
        social: character.stats.social,
        exploration: 0
    };
    
    // 清空本学期获得的道具
    gameState.semesterItemsAcquired = [];
    
    // 重置学期计数
    gameState.semesterActions = 0;
    gameState.semesterNPCInteractions = 0;
    
    // 更新角色显示
    document.getElementById('player-name').textContent = character.name;
    document.getElementById('player-avatar').innerHTML = `<img src="${character.avatar}" alt="${character.name}" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">`;
    document.getElementById('player-avatar').style.background = `linear-gradient(135deg, ${character.color}, ${character.color}99)`;
    
    // 更新场景对话
    updateDialogue(`系统`, `你选择了${character.name}作为你的角色。大学生活即将开始！`);
    
    // 关闭模态框
    document.getElementById('character-select-modal').style.display = 'none';
    
    // 生成本周NPC
    generateWeeklyNPCs();
    
    // 更新UI
    updateUI();
    
    // 显示欢迎事件
    setTimeout(() => {
        showEventResult("欢迎入学", `欢迎来到福建大学，${character.name}！你已成功入学，获得了学生卡和神秘道具"蓝色大嘴鱼"。接下来你将开始4年的大学生存挑战，请合理分配时间，平衡学业、社交与探索，努力达成毕业条件！`);
    }, 500);
}

// 生成本周NPC
function generateWeeklyNPCs() {
    // 清空上周的NPC
    gameState.weeklyNPCs = [];
    gameState.interactedNPCs = [];
    
    // 从NPC数据库中随机选择3个NPC
    const availableNPCs = [...npcDatabase];
    
    // 如果玩家已经选择了角色，那么其他角色也会成为NPC
    if (gameState.currentCharacter) {
        // 将其他角色添加到NPC列表中
        characters.forEach(character => {
            if (character.id !== gameState.currentCharacter.id) {
                availableNPCs.push({
                    name: character.name,
                    icon: character.icon,
                    interactions: [
                        {
                            description: `你遇到了${character.name}，他/她热情地和你打招呼，你们聊得很愉快。`,
                            effect: { social: 8 }
                        },
                        {
                            description: `你向${character.name}请教问题，他/她详细地为你解答。`,
                            effect: { intelligence: 6, social: 3 }
                        },
                        {
                            description: `你和${character.name}一起吃饭，他/她请你吃了一顿大餐。`,
                            effect: { health: 15, money: 10 }
                        },
                        {
                            description: `${character.name}邀请你参加他/她的活动，你婉拒了，但感受到了友谊。`,
                            effect: { social: 5 }
                        }
                    ]
                });
            }
        });
    }
    
    // 随机选择3个NPC
    const selectedNPCs = [];
    while (selectedNPCs.length < 3 && availableNPCs.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableNPCs.length);
        selectedNPCs.push(availableNPCs[randomIndex]);
        availableNPCs.splice(randomIndex, 1); // 避免重复选择
    }
    
    gameState.weeklyNPCs = selectedNPCs;
}