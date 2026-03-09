// 游戏状态
const gameState = {
    // 当前角色
    currentCharacter: null,
    
    // 时间（每个学期8周）
    year: 1,
    semester: 1,
    week: 1,
    
    // 核心数值
    health: 100,
    money: 50,
    credit: 45,
    intelligence: 50,
    social: 50,
    exploration: 0,
    
    // 游戏进度
    actionsTaken: 0,
    maxActionsPerWeek: 10,
    
    // 场景
    currentScene: "校园广场",
    
    // 背包
    inventory: [
        { id: "blue-fish", name: "蓝色大嘴鱼", count: 1, type: "关键道具", description: "银色凉亭解锁宝藏的唯一钥匙", icon: "fas fa-fish", usable: true, effect: { exploration: 10 }, canDiscard: false },
        { id: "student-card", name: "学生卡", count: 1, type: "日常道具", description: "身份证明，部分场景需要出示", icon: "fas fa-id-card", usable: false, effect: {}, canDiscard: false }
    ],
    
    // 已解锁的场景
    unlockedScenes: ["校园广场", "宿舍", "教室", "食堂", "图书馆", "学子超市"],
    
    // 已触发的灵异事件
    spiritEventsUnlocked: false,
    spiritEventsTriggered: [],
    
    // 本周已执行行动
    weeklyActions: [],
    
    // 本周NPC列表
    weeklyNPCs: [],
    
    // 本周已互动的NPC
    interactedNPCs: [],
    
    // 游戏结束标志
    gameEnded: false,
    
    // 当前选中的物品
    selectedItem: null,
    
    // 学期数据记录
    semesterStartStats: {
        health: 100,
        money: 50,
        credit: 45,
        intelligence: 50,
        social: 50,
        exploration: 0
    },
    
    // 本学期获得的道具
    semesterItemsAcquired: [],
    
    // 本学期行动计数
    semesterActions: 0,
    
    // 本学期NPC互动计数
    semesterNPCInteractions: 0
};

// 初始化游戏
function initGame() {
    // 显示角色选择模态框
    showCharacterSelect();
    
    // 更新UI
    updateUI();
    
    // 设置事件监听器
    document.getElementById('close-character-modal').addEventListener('click', function() {
        document.getElementById('character-select-modal').style.display = 'none';
    });
    
    document.getElementById('close-event-modal').addEventListener('click', function() {
        document.getElementById('event-result-modal').style.display = 'none';
    });
    
    document.getElementById('event-result-ok').addEventListener('click', function() {
        document.getElementById('event-result-modal').style.display = 'none';
    });
    
    document.getElementById('close-item-modal').addEventListener('click', function() {
        document.getElementById('item-detail-modal').style.display = 'none';
    });
    
    document.getElementById('close-item-detail').addEventListener('click', function() {
        document.getElementById('item-detail-modal').style.display = 'none';
    });
    
    document.getElementById('continue-semester-btn').addEventListener('click', function() {
        document.getElementById('semester-summary-modal').style.display = 'none';
        processSemesterEnd();
    });
}

// 更新UI
function updateUI() {
    // 更新数值显示
    document.getElementById('health-value').textContent = gameState.health;
    document.getElementById('money-value').textContent = gameState.money;
    document.getElementById('credit-value').textContent = gameState.credit;
    document.getElementById('intelligence-value').textContent = gameState.intelligence;
    document.getElementById('social-value').textContent = gameState.social;
    document.getElementById('exploration-value').textContent = gameState.exploration;
    
    // 更新生命值颜色（低生命值时变红）
    const healthElement = document.getElementById('health-value');
    if (gameState.health < 30) {
        healthElement.classList.add('critical');
    } else {
        healthElement.classList.remove('critical');
    }
    
    // 更新时间显示
    document.getElementById('time-info').textContent = `第${gameState.year}年 - 第${gameState.semester}学期 - 第${gameState.week}周`;
    
    // 更新场景显示
    document.getElementById('current-scene').textContent = `福建大学 - ${gameState.currentScene}`;
    document.getElementById('current-scene-name').textContent = gameState.currentScene;
    document.getElementById('scene-image').innerHTML = `<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 1.5rem; color: #0d47a1; font-weight: bold;">${scenes[gameState.currentScene]?.imageText || gameState.currentScene}</div>`;
    
    // 更新场景标签
    updateSceneTabs();
    
    // 更新行动按钮
    updateActionButtons();
    
    // 更新背包
    updateInventory();
    
    // 更新周进度
    document.getElementById('actions-taken').textContent = gameState.actionsTaken;
    const progressPercent = Math.min(100, (gameState.actionsTaken / 3) * 100);
    document.getElementById('week-progress-bar').style.width = `${progressPercent}%`;
    
    // 更新NPC互动进度
    const npcActionsTaken = gameState.interactedNPCs.length;
    document.getElementById('npc-actions-taken').textContent = npcActionsTaken;
    const npcProgressPercent = Math.min(100, (npcActionsTaken / 3) * 100);
    document.getElementById('npc-progress-bar').style.width = `${npcProgressPercent}%`;
    
    // 更新本周已执行行动列表
    updateWeeklyActionsList();
    
    // 检查游戏结束条件
    checkGameEnd();
}

// 更新本周已执行行动列表
function updateWeeklyActionsList() {
    const container = document.getElementById('weekly-actions-container');
    container.innerHTML = '';
    
    if (gameState.weeklyActions.length === 0) {
        container.innerHTML = '<div style="color: #999; font-style: italic;">本周尚未执行任何行动</div>';
        return;
    }
    
    gameState.weeklyActions.forEach((action, index) => {
        const actionElement = document.createElement('div');
        actionElement.className = 'action-item';
        actionElement.innerHTML = `
            <i class="fas fa-check-circle" style="color: #4caf50;"></i>
            <span>${action}</span>
        `;
        container.appendChild(actionElement);
    });
}

// 切换场景
function changeScene(sceneName) {
    gameState.currentScene = sceneName;
    
    // 如果场景未解锁且不是NPC场景，添加到已解锁列表
    if (sceneName !== "NPC" && !gameState.unlockedScenes.includes(sceneName)) {
        gameState.unlockedScenes.push(sceneName);
    }
    
    // 更新对话
    if (sceneName === "NPC") {
        updateDialogue("系统", `你来到了校园中的社交区域，这里有许多同学和教职员工。点击NPC名称可以与他们互动，每次互动都会产生随机结果！`);
    } else {
        updateDialogue("系统", `你来到了${sceneName}。${scenes[sceneName].description}`);
    }
    
    // 更新UI
    updateUI();
    
    // 显示通知
    if (sceneName !== "NPC") {
        showNotification(`已切换到${sceneName}`);
    }
}

// 结束本周
function endWeek() {
    // 检查是否行动过少
    if (gameState.actionsTaken < 3) {
        showNotification("本周行动次数不足，可能导致体力下降！");
        applyEffects({ health: -3 });
    }
    
    // 检查是否有周度加成（无负面行为）
    if (gameState.actionsTaken >= 3 && gameState.credit >= 0) {
        // 随机选择一项数值增加
        const stats = ["health", "money", "credit", "intelligence", "social"];
        const randomStat = stats[Math.floor(Math.random() * stats.length)];
        applyEffects({ [randomStat]: 3 });
        
        showNotification(`本周表现良好，${getStatName(randomStat)}+3`);
    }
    
    // 推进时间
    gameState.week++;
    
    // 检查学期结束（每个学期8周）
    if (gameState.week > 8) {
        // 显示学期结算
        showSemesterSummary();
        return;
    }
    
    // 重置行动计数
    gameState.actionsTaken = 0;
    
    // 清空本周已执行行动
    gameState.weeklyActions = [];
    
    // 清空本周已互动的NPC
    gameState.interactedNPCs = [];
    
    // 生成新的本周NPC
    generateWeeklyNPCs();
    
    // 如果当前在NPC场景，切换回校园广场
    if (gameState.currentScene === "NPC") {
        gameState.currentScene = "校园广场";
    }
    
    // 更新对话
    updateDialogue("系统", `第${gameState.year}年第${gameState.semester}学期第${gameState.week}周开始了！`);
    
    // 更新UI
    updateUI();
    
    // 显示周度进展通知
    showNotification(`新的一周开始了！`);
}

// 学期结算处理
function processSemesterEnd() {
    // 学期结算
    semesterSettlement();
    
    // 推进时间
    gameState.week = 1;
    gameState.semester++;
    
    // 检查学年结束
    if (gameState.semester > 2) {
        gameState.semester = 1;
        gameState.year++;
        
        // 检查游戏结束（4年结束）
        if (gameState.year > 4) {
            endGame();
            return;
        }
    }
    
    // 记录新学期开始时的数值
    gameState.semesterStartStats = {
        health: gameState.health,
        money: gameState.money,
        credit: gameState.credit,
        intelligence: gameState.intelligence,
        social: gameState.social,
        exploration: gameState.exploration
    };
    
    // 清空本学期获得的道具
    gameState.semesterItemsAcquired = [];
    
    // 重置学期计数
    gameState.semesterActions = 0;
    gameState.semesterNPCInteractions = 0;
    
    // 重置行动计数
    gameState.actionsTaken = 0;
    
    // 清空本周已执行行动
    gameState.weeklyActions = [];
    
    // 清空本周已互动的NPC
    gameState.interactedNPCs = [];
    
    // 生成新的本周NPC
    generateWeeklyNPCs();
    
    // 如果当前在NPC场景，切换回校园广场
    if (gameState.currentScene === "NPC") {
        gameState.currentScene = "校园广场";
    }
    
    // 更新对话
    updateDialogue("系统", `第${gameState.year}年第${gameState.semester}学期第${gameState.week}周开始了！`);
    
    // 更新UI
    updateUI();
    
    // 显示周度进展通知
    showNotification(`新学期开始了！`);
}

// 学期结算
function semesterSettlement() {
    // 计算四项核心数值总和
    const totalStats = gameState.health + gameState.money + gameState.credit + gameState.intelligence;
    
    // 检查是否达到学期奖励条件（由于学期缩短为8周，奖励条件调整为40）
    if (totalStats >= 40) {
        // 增加资金
        gameState.money += 10;
        
        // 显示奖励
        showNotification(`本学期表现良好，四项核心数值总和为${totalStats}，获得资金+10！`);
    } else {
        showNotification(`本学期结束，四项核心数值总和为${totalStats}，未达到奖励条件。`);
    }
    
    // 检查学分是否修满（每学期至少修满5学分，因为学期缩短为8周）
    const requiredCredits = 5 * (gameState.semester + (gameState.year - 1) * 2);
    if (gameState.credit < requiredCredits) {
        showEventResult("学分警告", `本学期学分修习不足，下学期需要补考，将消耗时间和资金！`);
        // 下学期第一周自动触发补考事件
    }
}

// 检查游戏结束
function checkGameEnd() {
    // 生命值归零
    if (gameState.health <= 0) {
        endGame("生命值归零，游戏结束！解锁'噶了'称号。");
        return;
    }
    
    // 资金为0且持续扣除生命值
    if (gameState.money <= 0) {
        // 每"小时"扣除2生命值，这里简化为每周检查时扣除
        if (gameState.week % 2 === 0) {
            gameState.health -= 2;
            showNotification("资金为0，生命值-2");
            updateUI();
        }
    }
}

// 游戏结束
function endGame(reason) {
    if (!reason) {
        // 正常4年结束，计算结局
        const totalStats = gameState.health + gameState.money + gameState.credit + gameState.intelligence;
        
        let endingTitle = "";
        let endingDescription = "";
        
        // 检查是否解锁了宝藏秘密（拥有蓝色大嘴鱼且使用过）
        const blueFishUsed = gameState.inventory.some(item => item.name === "蓝色大嘴鱼" && item.used);
        const hasFragments = gameState.inventory.find(item => item.name === "凉亭线索碎片");
        const fragmentsEnough = hasFragments && hasFragments.count >= 10;
        
        if (totalStats >= 500 && (blueFishUsed || fragmentsEnough)) {
            endingTitle = "优秀毕业结局";
            endingDescription = "恭喜你以优异成绩毕业，并解锁了银色凉亭的宝藏秘密！获得'校园传奇毕业生'称号！";
        } else if (totalStats >= 400) {
            endingTitle = "普通毕业结局";
            endingDescription = "你顺利完成了大学学业，获得'佛系毕业生'称号。";
        } else {
            endingTitle = "肄业结局";
            endingDescription = "未能达到毕业条件，需要重修一年。解锁'重修达人'称号。";
        }
        
        showEventResult(endingTitle, endingDescription + "<br><br>游戏结束，感谢游玩！");
    } else {
        showEventResult("游戏结束", reason);
    }
    
    gameState.gameEnded = true;
    
    // 禁用所有行动按钮
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(button => {
        button.disabled = true;
    });
}

// 页面加载完成后初始化游戏
document.addEventListener('DOMContentLoaded', initGame);