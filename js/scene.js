// 场景数据
const scenes = {
    "校园广场": {
        description: "这里是福建吃饭大学的中心，是学生们聚集的地方。",
        imageText: "校园广场",
        actions: [
            {
                name: "散步",
                description: "在校园广场散步，放松心情。",
                effects: { health: 5, social: 3 },
                icon: "fas fa-walking"
            },
            {
                name: "拍照",
                description: "在校园广场拍照，展示今日潮流穿搭。",
                effects: { social: 8 },
                icon: "fas fa-camera"
            },
            {
                name: "休息",
                description: "在广场的长椅上休息，恢复体力。",
                effects: { health: 15 },
                icon: "fas fa-couch"
            }
        ]
    },
    "宿舍": {
        description: "你的温馨小窝，是你休息和学习的地方。",
        imageText: "宿舍",
        actions: [
            {
                name: "睡觉",
                description: "真几把困，睡一觉，恢复体力和精力。",
                effects: { health: 20, intelligence: 5 },
                icon: "fas fa-bed"
            },
            {
                name: "学习",
                description: "打了5小时游戏，学习10分钟，提高智力和学分。",
                effects: { intelligence: 15, credit: 5 },
                icon: "fas fa-book"
            },
            {
                name: "整理",
                description: "整理宿舍，把厕所刷的干干净净。",
                effects: { health: 5, intelligence: 3 },
                icon: "fas fa-broom"
            }
        ]
    },
    "教室": {
        description: "学习的地方，这里有许多知识等待你去探索。",
        imageText: "教室",
        actions: [
            {
                name: "上课",
                description: "去笃行楼上课，提高智力和学分。",
                effects: { intelligence: 20, credit: 10, health: -5 },
                icon: "fas fa-chalkboard-teacher"
            },
            {
                name: "自习",
                description: "在教室里晚自习，提高智力。",
                effects: { intelligence: 15, health: -3 },
                icon: "fas fa-user-graduate"
            },
            {
                name: "小组讨论",
                description: "和同学进行小组讨论，提高社交和智力。",
                effects: { social: 10, intelligence: 10 },
                icon: "fas fa-users"
            }
        ]
    },
    "食堂": {
        description: "吃饭的地方，这里有各种美食等待你去品尝。",
        imageText: "食堂",
        actions: [
            {
                name: "吃饭",
                description: "在香草园吃了砂锅，恢复体力。",
                effects: { health: 25, money: -15 },
                icon: "fas fa-utensils"
            },
            {
                name: "聊天",
                description: "在食堂遇到副班长，和她聊天，提高社交。",
                effects: { social: 15, health: -5 },
                icon: "fas fa-comments"
            },
            {
                name: "兼职",
                description: "在食堂兼职卖咖喱饭，赚取资金。",
                effects: { money: 30, health: -10 },
                icon: "fas fa-briefcase"
            }
        ]
    },
    "图书馆": {
        description: "知识的海洋，这里有许多书籍等待你去阅读。",
        imageText: "图书馆",
        actions: [
            {
                name: "阅读",
                description: "在图书馆阅假装自己爱学习，提高智力。",
                effects: { intelligence: 25, health: -5 },
                icon: "fas fa-book"
            },
            {
                name: "研究",
                description: "在图书馆研究之前的考题，提高智力和学分。",
                effects: { intelligence: 20, credit: 8, health: -8 },
                icon: "fas fa-search"
            },
            {
                name: "帮找书",
                description: "在图书馆帮人找书，提高社交和智力。",
                effects: { social: 5, intelligence: 8 },
                icon: "fas fa-exchange-alt"
            }
        ]
    },
    "学子超市": {
        description: "购物的地方，这里有各种商品等待你去购买。",
        imageText: "学子超市",
        actions: [
            {
                name: "购物",
                description: "在超市买了一带散装小零食，恢复体力和社交。",
                effects: { health: 10, social: 5, money: -20 },
                icon: "fas fa-shopping-cart"
            },
            {
                name: "兼职",
                description: "在超市做兼职收银员，赚取资金。",
                effects: { money: 35, health: -12 },
                icon: "fas fa-briefcase"
            },
            {
                name: "抽奖",
                description: "在超市消费满100元，有机会博饼。",
                effects: { money: -10 },
                icon: "fas fa-gift",
                special: "lottery"
            }
        ]
    },
    "NPC": {
        description: "这里有许多NPC等待你去互动。",
        imageText: "NPC互动区",
        actions: []
    }
};

// 更新场景标签
function updateSceneTabs() {
    const sceneTabsContainer = document.getElementById('scene-tabs');
    sceneTabsContainer.innerHTML = '';
    
    // 场景标签
    Object.keys(scenes).forEach(sceneName => {
        const sceneTab = document.createElement('div');
        sceneTab.className = 'scene-tab';
        
        // 检查是否已解锁
        if (sceneName !== "NPC" && !gameState.unlockedScenes.includes(sceneName)) {
            sceneTab.classList.add('locked');
            sceneTab.innerHTML = `<div class="scene-image" style="background-image: url('./images/scene/${sceneName}.jpg');"></div><div class="scene-name"><i class="fas fa-lock"></i> ${sceneName}</div>`;
        } else {
            // NPC场景特殊样式
            if (sceneName === "NPC") {
                sceneTab.classList.add('npc-tab');
                sceneTab.innerHTML = `<div class="scene-image" style="background-image: url('./images/scene/NPC.jpg');"></div><div class="scene-name">${sceneName}</div>`;
            } else {
                sceneTab.innerHTML = `<div class="scene-image" style="background-image: url('./images/scene/${sceneName}.jpg');"></div><div class="scene-name">${sceneName}</div>`;
            }
            
            // 添加点击事件
            sceneTab.addEventListener('click', function() {
                changeScene(sceneName);
                
                // 显示/隐藏NPC互动区域
                if (sceneName === "NPC") {
                    showNPCInteractionArea();
                } else {
                    document.getElementById('npc-interaction-area').style.display = 'none';
                }
            });
            
            // 标记当前场景
            if (gameState.currentScene === sceneName) {
                sceneTab.classList.add('active');
            }
        }
        
        sceneTabsContainer.appendChild(sceneTab);
    });
}

// 更新行动按钮
function updateActionButtons() {
    const actionButtonsContainer = document.getElementById('action-buttons');
    actionButtonsContainer.innerHTML = '';
    
    // 获取当前场景的行动
    const currentSceneActions = scenes[gameState.currentScene]?.actions || [];
    
    // 创建行动按钮行
    const actionButtonsRow = document.createElement('div');
    actionButtonsRow.className = 'action-buttons-row';
    
    currentSceneActions.forEach(action => {
        const actionButton = document.createElement('button');
        actionButton.className = 'action-btn';
        actionButton.innerHTML = `<i class="${action.icon}"></i> ${action.name}`;
        
        // 添加点击事件
        actionButton.addEventListener('click', function() {
            performAction(action);
        });
        
        actionButtonsRow.appendChild(actionButton);
    });
    
    actionButtonsContainer.appendChild(actionButtonsRow);
    
    // 添加结束本周按钮
    const endWeekButton = document.createElement('button');
    endWeekButton.className = 'action-btn';
    endWeekButton.innerHTML = '<i class="fas fa-calendar-check"></i> 结束本周';
    endWeekButton.style.width = '100%';
    endWeekButton.addEventListener('click', endWeek);
    actionButtonsContainer.appendChild(endWeekButton);
}

// 执行行动
function performAction(action) {
    // 检查是否达到最大行动次数
    if (gameState.actionsTaken >= gameState.maxActionsPerWeek) {
        showNotification("本周行动次数已用完！");
        return;
    }
    
    // 应用效果
    applyEffects(action.effects);
    
    // 特殊行动处理
    if (action.special === "lottery") {
        // 抽奖逻辑
        const lotteryResult = Math.random();
        if (lotteryResult < 0.3) {
            // 获得道具
            const item = randomDropItem();
            if (item) {
                addItem(item);
                showEventResult("抽奖结果", `你抽到了${item.name}！`);
            }
        } else {
            showEventResult("抽奖结果", "很遗憾，你没有抽到任何东西。");
        }
    }
    
    // 增加行动计数
    gameState.actionsTaken++;
    gameState.semesterActions++;
    
    // 记录行动
    gameState.weeklyActions.push(`${action.name}: ${action.description}`);
    
    // 显示行动结果
    showEventResult("行动结果", action.description);
    
    // 更新UI
    updateUI();
    
    // 检查是否达到周行动上限
    if (gameState.actionsTaken >= gameState.maxActionsPerWeek) {
        showNotification("本周行动次数已用完，准备结束本周！");
    }
    
    // 有一定概率触发随机事件
    if (Math.random() < 0.15) {
        triggerRandomEvent();
    }
}