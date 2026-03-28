// ============================================
// SHADOW QUEST — A 2D RPG Adventure Game
// Built with JavaScript + Canvas
// ============================================

// ── GAME CONFIG ──
const GAME_CONFIG = {
  title: "Shadow Quest",
  version: "1.0.0",
  resolution: { width: 1280, height: 720 },
  fps: 60,
};

// ── GAME STATES ──
// These control which scene/music should be playing
const GAME_STATES = {
  MAIN_MENU:    "main_menu",
  LOADING:      "loading",
  EXPLORATION:  "exploration",
  COMBAT:       "combat",
  BOSS_BATTLE:  "boss_battle",
  CUTSCENE:     "cutscene",
  GAME_OVER:    "game_over",
  VICTORY:      "victory",
  SHOP:         "shop",
};

let currentState = GAME_STATES.MAIN_MENU;
let previousState = null;

// ── PLAYER ──
const player = {
  name: "Hero",
  hp: 100,
  maxHp: 100,
  mp: 50,
  maxMp: 50,
  level: 1,
  exp: 0,
  gold: 0,
  position: { x: 0, y: 0 },
  velocity: { x: 0, y: 0 },
  speed: 4,
  isAttacking: false,
  isDead: false,
  inventory: [],
  equippedWeapon: "wooden_sword",
  equippedArmor: "cloth_armor",
};

// ── ENEMIES ──
const ENEMY_TYPES = {
  SLIME: {
    name: "Slime",
    hp: 20,
    attack: 5,
    defense: 2,
    exp: 10,
    gold: 5,
    isBoss: false,
  },
  GOBLIN: {
    name: "Goblin",
    hp: 35,
    attack: 12,
    defense: 5,
    exp: 25,
    gold: 15,
    isBoss: false,
  },
  SKELETON: {
    name: "Skeleton Warrior",
    hp: 50,
    attack: 18,
    defense: 8,
    exp: 40,
    gold: 20,
    isBoss: false,
  },
  DARK_KNIGHT: {
    name: "Dark Knight",
    hp: 200,
    attack: 35,
    defense: 20,
    exp: 200,
    gold: 100,
    isBoss: true,
    bossPhase: 1,
    maxPhases: 3,
    specialAttacks: ["shadow_slash", "dark_explosion", "death_ray"],
  },
  SHADOW_DRAGON: {
    name: "Shadow Dragon — Final Boss",
    hp: 500,
    attack: 60,
    defense: 30,
    exp: 1000,
    gold: 500,
    isBoss: true,
    bossPhase: 1,
    maxPhases: 4,
    specialAttacks: ["fire_breath", "wing_slash", "shadow_nova", "dragon_roar"],
    theme: "final_boss_theme",
  },
};

let activeEnemies = [];
let currentBoss = null;

// ── WORLD / LEVELS ──
const LEVELS = {
  PEACEFUL_VILLAGE: {
    id: "peaceful_village",
    name: "Peaceful Village",
    mood: "calm and cozy, villagers going about their day",
    ambience: "birds chirping, market sounds, cheerful atmosphere",
    musicTheme: "village_theme",
    hasEnemies: false,
    isIndoor: false,
  },
  ENCHANTED_FOREST: {
    id: "enchanted_forest",
    name: "Enchanted Forest",
    mood: "mysterious and adventurous, ancient magic in the air",
    ambience: "rustling leaves, distant creatures, magical sparkles",
    musicTheme: "forest_exploration",
    hasEnemies: true,
    enemyTypes: ["SLIME", "GOBLIN"],
    isIndoor: false,
  },
  DARK_DUNGEON: {
    id: "dark_dungeon",
    name: "Dark Dungeon",
    mood: "tense and foreboding, danger lurks in every shadow",
    ambience: "dripping water, distant growls, eerie silence",
    musicTheme: "dungeon_theme",
    hasEnemies: true,
    enemyTypes: ["SKELETON", "GOBLIN"],
    isIndoor: true,
  },
  BOSS_CHAMBER: {
    id: "boss_chamber",
    name: "Dark Knight's Chamber",
    mood: "epic confrontation, the air crackles with dark energy",
    ambience: "ominous silence, distant thunder, dark power humming",
    musicTheme: "boss_battle_theme",
    hasEnemies: true,
    isBossRoom: true,
    boss: "DARK_KNIGHT",
    isIndoor: true,
  },
  DRAGON_LAIR: {
    id: "dragon_lair",
    name: "Shadow Dragon's Lair",
    mood: "climactic final battle, world-shaking power",
    ambience: "roaring flames, earth trembling, apocalyptic energy",
    musicTheme: "final_boss_theme",
    hasEnemies: true,
    isBossRoom: true,
    boss: "SHADOW_DRAGON",
    isFinalLevel: true,
    isIndoor: true,
  },
};

let currentLevel = LEVELS.PEACEFUL_VILLAGE;

// ── MAIN GAME LOOP ──
function gameLoop(timestamp) {
  update(timestamp);
  render();
  requestAnimationFrame(gameLoop);
}

function update(timestamp) {
  switch (currentState) {
    case GAME_STATES.MAIN_MENU:
      updateMainMenu();
      break;
    case GAME_STATES.EXPLORATION:
      updateExploration();
      break;
    case GAME_STATES.COMBAT:
      updateCombat();
      break;
    case GAME_STATES.BOSS_BATTLE:
      updateBossBattle();
      break;
    case GAME_STATES.GAME_OVER:
      updateGameOver();
      break;
    case GAME_STATES.VICTORY:
      updateVictory();
      break;
    case GAME_STATES.SHOP:
      updateShop();
      break;
  }
}

// ── MAIN MENU ──
// Calm, welcoming music — the game's identity theme
// Should feel inviting, heroic but gentle, with a sense of adventure ahead
function updateMainMenu() {
  // Show title screen, play main theme
  // "Shadow Quest" logo animates in
  // Options: New Game, Continue, Settings
}

function startNewGame() {
  currentState = GAME_STATES.LOADING;
  loadLevel(LEVELS.PEACEFUL_VILLAGE);
}

// ── EXPLORATION ──
// Ambient music that matches the current world
// Should shift dynamically based on the level's mood
function updateExploration() {
  handlePlayerMovement();
  checkForEnemies();
  checkForNPCs();
  updateWorld();

  // Check if player entered a dangerous area
  if (currentLevel.hasEnemies && detectEnemyProximity()) {
    // Music should start building tension before combat triggers
    startCombatTransition();
  }
}

function handlePlayerMovement() {
  if (keys.ArrowLeft || keys.a) player.velocity.x = -player.speed;
  else if (keys.ArrowRight || keys.d) player.velocity.x = player.speed;
  else player.velocity.x = 0;

  if (keys.ArrowUp || keys.w) player.velocity.y = -player.speed;
  else if (keys.ArrowDown || keys.s) player.velocity.y = player.speed;
  else player.velocity.y = 0;

  player.position.x += player.velocity.x;
  player.position.y += player.velocity.y;
}

// ── COMBAT SYSTEM ──
// Intense, driving music — tempo increases with more enemies
// Urgency grows as player health drops
function updateCombat() {
  updateEnemyAI();
  handlePlayerAttack();
  checkCombatEnd();

  // Dynamic music intensity based on situation
  const combatIntensity = calculateCombatIntensity();

  if (player.hp < player.maxHp * 0.25) {
    // CRITICAL HP — music becomes desperate, frantic
    triggerLowHealthMusic();
  } else if (activeEnemies.length > 5) {
    // OVERWHELMED — music is chaotic and intense
    triggerOverwhelmedMusic();
  }
}

function calculateCombatIntensity() {
  const hpRatio = player.hp / player.maxHp;
  const enemyCount = activeEnemies.length;
  const tension = (1 - hpRatio) * 50 + enemyCount * 10;
  return Math.min(100, tension);
}

function handlePlayerAttack() {
  if (keys.space || keys.z) {
    player.isAttacking = true;
    const attackRange = 50;
    activeEnemies.forEach(enemy => {
      const dist = getDistance(player.position, enemy.position);
      if (dist < attackRange) {
        dealDamage(enemy, player.attackPower);
      }
    });
  }
}

function checkCombatEnd() {
  if (activeEnemies.length === 0) {
    // Victory fanfare — short celebratory sting
    playVictoryStinger();
    currentState = GAME_STATES.EXPLORATION;
  }
  if (player.hp <= 0) {
    triggerPlayerDeath();
  }
}

// ── BOSS BATTLE ──
// EPIC music — full orchestral, massive percussion
// Should have multiple phases as boss health drops
function updateBossBattle() {
  if (!currentBoss) return;

  updateBossAI();
  handleBossPhaseTransition();
  handlePlayerAttack();

  // Boss phase 2 — music intensifies dramatically
  if (currentBoss.hp < currentBoss.maxHp * 0.66 && currentBoss.bossPhase === 1) {
    currentBoss.bossPhase = 2;
    triggerBossPhase2(); // Music shifts — more aggressive, darker
    screen.shake(0.5);
  }

  // Boss phase 3 — final desperate phase, maximum intensity
  if (currentBoss.hp < currentBoss.maxHp * 0.33 && currentBoss.bossPhase === 2) {
    currentBoss.bossPhase = 3;
    triggerBossPhase3(); // Chaotic, overwhelming orchestral climax
    screen.shake(1.0);
  }

  if (currentBoss.hp <= 0) {
    triggerBossDefeat();
  }

  if (player.hp <= 0) {
    triggerPlayerDeath();
  }
}

function updateBossAI() {
  if (!currentBoss) return;
  const phase = currentBoss.bossPhase;

  // Boss becomes more aggressive as phases progress
  const attackSpeed = 1 + (phase - 1) * 0.5;

  if (phase >= 2) {
    // Use special attacks more frequently
    if (Math.random() < 0.3 * phase) {
      const specialAttack = currentBoss.specialAttacks[
        Math.floor(Math.random() * currentBoss.specialAttacks.length)
      ];
      executeBossSpecialAttack(specialAttack);
    }
  }
}

function triggerBossDefeat() {
  // Dramatic victory music — relief + triumph after intense battle
  currentBoss = null;
  activeEnemies = [];

  if (currentLevel.isFinalLevel) {
    // FINAL VICTORY — grand orchestral ending, emotional resolution
    currentState = GAME_STATES.VICTORY;
    triggerGameVictory();
  } else {
    // Mid-game boss defeated — triumphant but adventure continues
    triggerBossVictoryStinger();
    currentState = GAME_STATES.EXPLORATION;
  }
}

// ── GAME OVER ──
// Somber, sad music — defeat and loss
// Should feel heavy but not hopeless — player can try again
function triggerPlayerDeath() {
  player.isDead = true;
  currentState = GAME_STATES.GAME_OVER;
  // Slow, mournful music — the hero has fallen
  // Fade to black
}

function updateGameOver() {
  // Show game over screen
  // Options: Retry, Main Menu
  // Melancholic ambient music plays softly
}

// ── VICTORY ──
// Grand triumphant finale — the hero saved the world!
// Full orchestra, choir, emotional and uplifting
function triggerGameVictory() {
  currentState = GAME_STATES.VICTORY;
  // Credits roll
  // Grand victory theme — the biggest, most emotional track in the game
}

function updateVictory() {
  // Show victory screen, credits
  // Triumphant theme swells
}

// ── SHOP / TOWN ──
// Relaxed, cheerful music — safe haven between adventures
// Lighthearted and mercantile, cozy feeling
function updateShop() {
  // NPC shopkeeper dialogue
  // Browse items
  // Buy/sell equipment
  // Cheerful town music with a commercial jingle feel
}

// ── CUTSCENE ──
// Dramatic orchestral score matching the story beat
// Can be sad, tense, mysterious, or triumphant depending on story moment
function playCutscene(cutsceneId) {
  previousState = currentState;
  currentState = GAME_STATES.CUTSCENE;

  const cutscenes = {
    INTRO: {
      mood: "mysterious and epic — the world is in danger",
      musicTone: "dark orchestral with building tension",
    },
    MENTOR_DEATH: {
      mood: "deeply sad and emotional — loss of a beloved character",
      musicTone: "slow mournful strings, heart-wrenching melody",
    },
    HERO_RISES: {
      mood: "triumphant awakening — the hero finds their power",
      musicTone: "building from quiet to explosive orchestral fanfare",
    },
    FINAL_REVELATION: {
      mood: "shocking twist — the truth is revealed",
      musicTone: "tense, dissonant, world-shaking",
    },
  };
}

// ── AUDIO MANAGER ──
// Handles all music transitions and sound effects
const AudioManager = {
  currentTrack: null,
  volume: 0.8,
  isMuted: false,

  playTrack(trackId, fadeIn = true) {
    if (this.currentTrack === trackId) return;
    this.currentTrack = trackId;
    console.log(`Playing track: ${trackId}`);
  },

  stopTrack(fadeOut = true) {
    this.currentTrack = null;
  },

  // Music should change based on game state
  updateMusicForState(state) {
    switch (state) {
      case GAME_STATES.MAIN_MENU:
        this.playTrack("main_theme");
        break;
      case GAME_STATES.EXPLORATION:
        this.playTrack(currentLevel.musicTheme);
        break;
      case GAME_STATES.COMBAT:
        this.playTrack("combat_theme");
        break;
      case GAME_STATES.BOSS_BATTLE:
        this.playTrack(currentBoss?.theme || "boss_battle_theme");
        break;
      case GAME_STATES.GAME_OVER:
        this.playTrack("game_over_theme");
        break;
      case GAME_STATES.VICTORY:
        this.playTrack("victory_theme");
        break;
      case GAME_STATES.SHOP:
        this.playTrack("shop_theme");
        break;
    }
  },
};

// ── UTILITY ──
function getDistance(pos1, pos2) {
  return Math.hypot(pos2.x - pos1.x, pos2.y - pos1.y);
}

function dealDamage(target, damage) {
  const actualDamage = Math.max(0, damage - (target.defense || 0));
  target.hp -= actualDamage;
  if (target.hp <= 0) target.isDead = true;
  return actualDamage;
}

function loadLevel(level) {
  currentLevel = level;
  activeEnemies = [];
  currentBoss = null;
  if (level.isBossRoom) {
    currentBoss = { ...ENEMY_TYPES[level.boss] };
    currentBoss.maxHp = currentBoss.hp;
    activeEnemies.push(currentBoss);
  }
  currentState = GAME_STATES.EXPLORATION;
  AudioManager.updateMusicForState(currentState);
}

// ── START GAME ──
requestAnimationFrame(gameLoop);
