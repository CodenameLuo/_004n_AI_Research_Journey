<template>
  <div class="home-page">
    <!-- 动态背景元素 -->
    <div class="background-animations">
      <!-- 动态波浪 -->
      <div class="waves">
        <div class="wave wave1"></div>
        <div class="wave wave2"></div>
        <div class="wave wave3"></div>
      </div>

      <!-- 漂浮的气泡 -->
      <div class="bubbles">
        <div class="bubble bubble1" @click.stop="burstBubble"></div>
        <div class="bubble bubble2" @click.stop="burstBubble"></div>
        <div class="bubble bubble3" @click.stop="burstBubble"></div>
        <div class="bubble bubble4" @click.stop="burstBubble"></div>
        <div class="bubble bubble5" @click.stop="burstBubble"></div>
        <div class="bubble bubble6" @click.stop="burstBubble"></div>
        <div class="bubble bubble7" @click.stop="burstBubble"></div>
        <div class="bubble bubble8" @click.stop="burstBubble"></div>
        <div class="bubble bubble9" @click.stop="burstBubble"></div>
        <div class="bubble bubble10" @click.stop="burstBubble"></div>
      </div>
    </div>

    <!-- 头部标题 -->
    <div class="header">
      <!-- 背景装饰几何图形 -->
      <div class="header-decorations">
        <div class="decoration-circle circle-1"></div>
        <div class="decoration-circle circle-2"></div>
        <div class="decoration-triangle triangle-1"></div>
        <div class="decoration-triangle triangle-2"></div>
        <div class="decoration-star star-1">✦</div>
        <div class="decoration-star star-2">✧</div>
        <div class="decoration-star star-3">✦</div>
        <div class="decoration-star star-4">✧</div>
        <div class="decoration-star star-5">✦</div>
      </div>

      <!-- 主标题容器 -->
      <div class="title-container">
        <!-- 发光背景 -->
        <div class="title-glow"></div>

        <!-- 主标题 -->
        <h1 class="title">
          <span class="title-icon">🎨</span>
          <span class="title-text">
            <span class="title-char" style="--delay: 0s">A</span>
            <span class="title-char" style="--delay: 0.1s">I</span>
            <span class="title-char" style="--delay: 0.2s">创</span>
            <span class="title-char" style="--delay: 0.3s">意</span>
            <span class="title-char" style="--delay: 0.4s">工</span>
            <span class="title-char" style="--delay: 0.5s">坊</span>
          </span>
        </h1>

        <!-- 装饰线条 -->
        <div class="title-lines">
          <div class="line line-left"></div>
          <div class="line line-right"></div>
        </div>
      </div>

      <!-- 副标题容器 -->
      <div class="subtitle-container">
        <p class="subtitle">
          <span class="subtitle-highlight">释放你的创意，让AI成为你的艺术伙伴</span>
        </p>
      </div>

      <!-- 光芒效果 -->
      <div class="light-rays">
        <div class="ray ray-1"></div>
        <div class="ray ray-2"></div>
        <div class="ray ray-3"></div>
        <div class="ray ray-4"></div>
        <div class="ray ray-5"></div>
        <div class="ray ray-6"></div>
      </div>
    </div>

    <!-- 功能卡片区域 -->
    <div class="features-section">
      <div class="features-container">
        <!-- 我的AI旅记卡片 -->
        <div class="feature-card story-diffusion-card" @click="navigateTo('/story-diffusion')">
          <div class="card-decoration">
            <div class="card-star star-1">✦</div>
            <div class="card-star star-2">✧</div>
            <div class="card-star star-3">✦</div>
          </div>
          <div class="card-content">
            <div class="card-icon">📖</div>
            <h3 class="card-title">我的AI旅记</h3>
            <p class="card-description">用AI创造属于你的童话故事</p>
            <div class="card-features">
              <span class="feature-tag">多图上传</span>
              <span class="feature-tag">故事生成</span>
              <span class="feature-tag">角色定制</span>
            </div>
          </div>
          <div class="card-glow"></div>
        </div>

        <!-- AI漫画卡片 -->
        <div class="feature-card ai-story-card" @click="navigateTo('/ai-story')">
          <div class="card-decoration">
            <div class="card-star star-1">✦</div>
            <div class="card-star star-2">✧</div>
            <div class="card-star star-3">✦</div>
          </div>
          <div class="card-content">
            <div class="card-icon">📷</div>
            <h3 class="card-title">AI漫画</h3>
            <p class="card-description">让AI把你变成漫画主角</p>
            <div class="card-features">
              <span class="feature-tag">自拍上传</span>
              <span class="feature-tag">风格选择</span>
              <span class="feature-tag">故事描述</span>
            </div>
          </div>
          <div class="card-glow"></div>
        </div>

        <!-- 简笔画卡片 -->
        <div class="feature-card stick-color-card" @click="navigateTo('/stick-color')">
          <div class="card-decoration">
            <div class="card-star star-1">✦</div>
            <div class="card-star star-2">✧</div>
            <div class="card-star star-3">✦</div>
          </div>
          <div class="card-content">
            <div class="card-icon">🖌️</div>
            <h3 class="card-title">简笔画画</h3>
            <p class="card-description">将你的简笔画变成精美图片</p>
            <div class="card-features">
              <span class="feature-tag">在线绘画</span>
              <span class="feature-tag">智能上色</span>
              <span class="feature-tag">风格转换</span>
            </div>
          </div>
          <div class="card-glow"></div>
        </div>

        <!-- 风格迁移卡片 -->
        <div class="feature-card style-transfer-card" @click="navigateTo('/style-transfer')">
          <div class="card-decoration">
            <div class="card-star star-1">✦</div>
            <div class="card-star star-2">✧</div>
            <div class="card-star star-3">✦</div>
          </div>
          <div class="card-content">
            <div class="card-icon">🖼️</div>
            <h3 class="card-title">风格迁移</h3>
            <p class="card-description">一键将图片转换为多种艺术风格</p>
            <div class="card-features">
              <span class="feature-tag">多风格</span>
              <span class="feature-tag">快速生成</span>
              <span class="feature-tag">高质量</span>
            </div>
          </div>
          <div class="card-glow"></div>
        </div>
      </div>
    </div>

    <!-- 底部装饰 -->
    <div class="footer-decoration">
      <div class="footer-waves">
        <div class="footer-wave wave1"></div>
        <div class="footer-wave wave2"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// 导航方法
const navigateTo = (path) => {
  router.push(path)
}

// 泡泡破裂效果
const burstBubble = (event) => {
  const bubble = event.target

  // 创建破裂动画
  bubble.style.animation = 'bubbleBurst 0.3s ease-out forwards'

  // 创建破裂粒子效果
  for (let i = 0; i < 6; i++) {
    const particle = document.createElement('div')
    particle.className = 'burst-particle'
    particle.style.left = bubble.offsetLeft + bubble.offsetWidth / 2 + 'px'
    particle.style.top = bubble.offsetTop + bubble.offsetHeight / 2 + 'px'
    particle.style.setProperty('--angle', Math.random() * 360 + 'deg')
    particle.style.setProperty('--distance', Math.random() * 50 + 20 + 'px')
    bubble.parentElement.appendChild(particle)

    // 移除粒子
    setTimeout(() => {
      if (particle.parentElement) {
        particle.parentElement.removeChild(particle)
      }
    }, 600)
  }

  // 重置泡泡
  setTimeout(() => {
    bubble.style.animation = ''
  }, 300)
}
</script>

<style scoped>
/* 全局字体设置 - 使用本地64_fonts.ttf字体适合6-12岁儿童 */
.home-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #ffb347 0%, #ff8c42 100%);
  padding: 20px;
  position: relative;
  overflow-x: hidden;
  /* 统一使用本地可爱字体：64_fonts.ttf */
  font-family: 'CuteFont64', 'Comic Sans MS', 'Microsoft YaHei', '微软雅黑', cursive, sans-serif;
  font-size: 16px;
  line-height: 1.8;
  font-weight: 400;
}

/* 动态背景容器 */
.background-animations {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.waves {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 43vh;
  overflow: hidden;
}

.wave {
  position: absolute;
  bottom: 0;
  left: -50%;
  width: 200vw;
  height: 450px;
  background: linear-gradient(90deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0.4) 25%,
      rgba(219, 219, 219, 0.6) 50%,
      rgba(255, 255, 255, 0.5) 75%,
      rgba(255, 255, 255, 0.1) 100%);
  border-radius: 50%;
  transform-origin: center bottom;
}

.wave1 {
  animation: waveMove 12s ease-in-out infinite;
  opacity: 0.4;
  height: 480px;
}

.wave2 {
  animation: waveMove 15s ease-in-out infinite reverse;
  opacity: 0.3;
  height: 440px;
  animation-delay: -3s;
}

.wave3 {
  animation: waveMove 18s ease-in-out infinite;
  opacity: 0.2;
  height: 400px;
  animation-delay: -6s;
}

@keyframes waveMove {
  0%, 100% {
    transform: translateX(0%) scaleY(0.8) rotate(-2deg);
  }
  25% {
    transform: translateX(5%) scaleY(1.1) rotate(1deg);
  }
  50% {
    transform: translateX(10%) scaleY(1.3) rotate(-1deg);
  }
  75% {
    transform: translateX(7%) scaleY(1.0) rotate(2deg);
  }
}

/* 气泡动画 */
.bubbles {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.bubble {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.1));
  border: 2px solid rgba(255, 255, 255, 0.3);
  animation: bubbleFloat linear infinite;
  cursor: pointer;
  transition: all 0.1s ease;
  pointer-events: auto;
}

.bubble:hover {
  transform: scale(1.1);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.2));
}

.bubble1 {
  width: 60px;
  height: 60px;
  left: 8%;
  animation: bubbleFloat 16s linear infinite;
}

.bubble2 {
  width: 40px;
  height: 40px;
  left: 18%;
  animation: bubbleFloat 20s linear infinite;
  animation-delay: -2s;
}

.bubble3 {
  width: 75px;
  height: 75px;
  left: 28%;
  animation: bubbleFloat 18s linear infinite;
  animation-delay: -4s;
}

.bubble4 {
  width: 35px;
  height: 35px;
  left: 38%;
  animation: bubbleFloat 14s linear infinite;
  animation-delay: -6s;
}

.bubble5 {
  width: 55px;
  height: 55px;
  left: 48%;
  animation: bubbleFloat 22s linear infinite;
  animation-delay: -8s;
}

.bubble6 {
  width: 45px;
  height: 45px;
  left: 58%;
  animation: bubbleFloat 17s linear infinite;
  animation-delay: -10s;
}

.bubble7 {
  width: 65px;
  height: 65px;
  left: 68%;
  animation: bubbleFloat 19s linear infinite;
  animation-delay: -12s;
}

.bubble8 {
  width: 30px;
  height: 30px;
  left: 78%;
  animation: bubbleFloat 15s linear infinite;
  animation-delay: -14s;
}

.bubble9 {
  width: 50px;
  height: 50px;
  left: 88%;
  animation: bubbleFloat 21s linear infinite;
  animation-delay: -16s;
}

.bubble10 {
  width: 70px;
  height: 70px;
  left: 12%;
  animation: bubbleFloat 23s linear infinite;
  animation-delay: -18s;
}

@keyframes bubbleFloat {
  0% {
    top: 110%;
    opacity: 0;
    transform: translateX(0) scale(0);
  }
  10% {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
  90% {
    opacity: 1;
    transform: translateX(20px) scale(1);
  }
  100% {
    top: -10%;
    opacity: 0;
    transform: translateX(40px) scale(0);
  }
}

/* 泡泡破裂动画 */
@keyframes bubbleBurst {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.3);
    opacity: 0.7;
  }
  100% {
    transform: scale(0);
    opacity: 0;
  }
}

/* 破裂粒子效果 */
.burst-particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  pointer-events: none;
  animation: particleBurst 0.6s ease-out forwards;
}

@keyframes particleBurst {
  0% {
    opacity: 1;
    transform: translate(0, 0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(calc(cos(var(--angle)) * var(--distance)),
        calc(sin(var(--angle)) * var(--distance))) scale(0);
  }
}

/* 确保内容在动画之上 */
.header,
.features-section {
  position: relative;
  z-index: 1;
}

.header {
  text-align: center;
  margin-bottom: 40px;
  position: relative;
  overflow: visible;
}

/* 背景装饰几何图形 */
.header-decorations {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.decoration-circle {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(45deg, rgba(255, 215, 0, 0.4), rgba(255, 140, 66, 0.3));
  animation: decorationFloat 8s ease-in-out infinite;
}

.circle-1 {
  width: 80px;
  height: 80px;
  top: 10%;
  left: 5%;
  animation-delay: 0s;
}

.circle-2 {
  width: 60px;
  height: 60px;
  top: 20%;
  right: 8%;
  animation-delay: -2s;
}

.decoration-triangle {
  position: absolute;
  width: 0;
  height: 0;
  animation: decorationSpin 12s linear infinite;
}

.triangle-1 {
  border-left: 25px solid transparent;
  border-right: 25px solid transparent;
  border-bottom: 43px solid rgba(255, 99, 71, 0.4);
  top: 15%;
  left: 15%;
  animation-delay: -1s;
}

.triangle-2 {
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-bottom: 35px solid rgba(255, 215, 0, 0.4);
  top: 25%;
  right: 20%;
  animation-delay: -3s;
}

.decoration-star {
  position: absolute;
  font-size: 1.5rem;
  color: rgba(255, 215, 0, 0.8);
  animation: starTwinkle 3s ease-in-out infinite;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.6);
}

.star-1 {
  top: 8%;
  left: 25%;
  animation-delay: 0s;
}

.star-2 {
  top: 12%;
  right: 15%;
  animation-delay: -0.5s;
}

.star-3 {
  top: 30%;
  left: 8%;
  animation-delay: -1s;
}

.star-4 {
  top: 35%;
  right: 25%;
  animation-delay: -1.5s;
}

.star-5 {
  top: 18%;
  left: 50%;
  animation-delay: -2s;
}

/* 主标题容器 */
.title-container {
  position: relative;
  z-index: 3;
  margin-bottom: 20px;
}

.title-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 450px;
  height: 120px;
  background: radial-gradient(ellipse, rgba(255, 215, 0, 0.4) 0%, transparent 70%);
  filter: blur(20px);
  animation: glowPulse 4s ease-in-out infinite;
}

.title {
  font-size: 4rem;
  font-family: 'CuteFont64', cursive;
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

.title-icon {
  font-size: 3.5rem;
  filter: drop-shadow(0 0 15px rgba(255, 140, 66, 0.6));
  animation: iconBounce 3s ease-in-out infinite;
}

.title-text {
  color: #2c1810;
  text-shadow:
    3px 3px 0px #ffd700,
    6px 6px 0px #fff8dc,
    9px 9px 0px rgba(255, 99, 71, 0.3),
    0 0 20px rgba(255, 215, 0, 0.6);
  animation: textGlow 3s ease-in-out infinite;
}

.title-char {
  display: inline-block;
  animation: charFloat 3s ease-in-out infinite;
  animation-delay: var(--delay);
}

/* 装饰线条 */
.title-lines {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  z-index: 1;
}

.line {
  position: absolute;
  height: 3px;
  background: linear-gradient(90deg, transparent, #ffd700, transparent);
  animation: lineExpand 4s ease-in-out infinite;
}

.line-left {
  left: 0;
  right: 65%;
  animation-delay: 0s;
}

.line-right {
  left: 65%;
  right: 0;
  animation-delay: -2s;
}

/* 副标题容器 */
.subtitle-container {
  position: relative;
  z-index: 3;
}

.subtitle {
  font-size: 1.6rem;
  margin: 0;
  font-family: 'CuteFont64', cursive;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  flex-wrap: wrap;
}

.subtitle-highlight {
  color: #8b0000;
  text-shadow:
    2px 2px 0px #ffd700,
    4px 4px 0px #fff8dc,
    0 0 10px rgba(255, 215, 0, 0.8);
  animation: highlightPulse 3s ease-in-out infinite;
}

/* 光芒效果 */
.light-rays {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 500px;
  pointer-events: none;
  z-index: 0;
}

.ray {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 1px;
  height: 120px;
  background: linear-gradient(to bottom,
      rgba(255, 215, 0, 0.6) 0%,
      rgba(255, 215, 0, 0.3) 50%,
      transparent 100%);
  transform-origin: bottom center;
  animation: rayRotate 20s linear infinite;
}

.ray-1 {
  transform: translate(-50%, -100%) rotate(0deg);
  animation-delay: 0s;
}

.ray-2 {
  transform: translate(-50%, -100%) rotate(60deg);
  animation-delay: -3.33s;
}

.ray-3 {
  transform: translate(-50%, -100%) rotate(120deg);
  animation-delay: -6.66s;
}

.ray-4 {
  transform: translate(-50%, -100%) rotate(180deg);
  animation-delay: -10s;
}

.ray-5 {
  transform: translate(-50%, -100%) rotate(240deg);
  animation-delay: -13.33s;
}

.ray-6 {
  transform: translate(-50%, -100%) rotate(300deg);
  animation-delay: -16.66s;
}

/* 功能卡片区域 */
.features-section {
  padding: 40px 0;
}

.features-container {
  max-width: 1800px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  padding: 0 20px;
}

.feature-card {
  background: #fff8dc;
  border-radius: 30px;
  padding: 40px 30px;
  border: 6px solid #f7a985;
  box-shadow: 
    0px 15px 30px rgba(255, 99, 71, 0.3),
    0px 8px 16px rgba(255, 140, 66, 0.2),
    inset 0px 2px 0px rgba(255, 255, 255, 0.6);
  position: relative;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(.4, 2, .6, 1);
  overflow: hidden;
  min-width: 300px;
}

.feature-card::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  transform: scale(0);
  transition: transform 0.6s ease;
}

.feature-card:hover::before {
  transform: scale(1);
}

.feature-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 
    0px 25px 50px rgba(255, 99, 71, 0.4),
    0px 15px 30px rgba(255, 140, 66, 0.3),
    inset 0px 2px 0px rgba(255, 255, 255, 0.7);
  border-color: #ff8c42;
}

.feature-card:active {
  transform: translateY(-5px) scale(1.01);
}

.card-decoration {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.card-star {
  position: absolute;
  font-size: 1.2rem;
  color: rgba(255, 215, 0, 0.8);
  animation: starTwinkle 3s ease-in-out infinite;
  text-shadow: 0 0 8px rgba(255, 215, 0, 0.6);
}

.card-star.star-1 {
  top: 15%;
  left: 15%;
  animation-delay: 0s;
}

.card-star.star-2 {
  top: 20%;
  right: 15%;
  animation-delay: -1s;
}

.card-star.star-3 {
  bottom: 20%;
  left: 20%;
  animation-delay: -2s;
}

.card-content {
  position: relative;
  z-index: 2;
  text-align: center;
}

.card-icon {
  font-size: 4rem;
  margin-bottom: 20px;
  filter: drop-shadow(0 0 10px rgba(255, 140, 66, 0.4));
  animation: iconBounce 4s ease-in-out infinite;
}

.card-title {
  font-size: 2.2rem;
  color: #8b4513;
  margin: 0 0 15px 0;
  font-family: 'CuteFont64', cursive;
  text-shadow: 
    2px 2px 0px #ffd700,
    4px 4px 0px rgba(255, 255, 255, 0.8);
  font-weight: 600;
  letter-spacing: 1px;
}

.card-description {
  font-size: 1.3rem;
  color: #8b4513;
  margin: 0 0 25px 0;
  line-height: 1.6;
  text-shadow: 1px 1px 0px rgba(255, 255, 255, 0.7);
  font-weight: 500;
}

.card-features {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

.feature-tag {
  background: linear-gradient(135deg, #ff8c42, #ffb347);
  color: #fff;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  border: 2px solid #f7a985;
  box-shadow: 
    0px 4px 8px rgba(255, 99, 71, 0.3),
    inset 0px 1px 0px rgba(255, 255, 255, 0.4);
  text-shadow: 1px 1px 2px rgba(139, 69, 19, 0.5);
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
}

.feature-tag:hover {
  background: linear-gradient(135deg, #ffb347, #ffd700);
  transform: translateY(-2px);
  box-shadow: 
    0px 6px 12px rgba(255, 99, 71, 0.4),
    inset 0px 1px 0px rgba(255, 255, 255, 0.5);
}

.card-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
  background: radial-gradient(ellipse, rgba(255, 215, 0, 0.1) 0%, transparent 70%);
  filter: blur(20px);
  opacity: 0;
  transition: opacity 0.6s ease;
}

.feature-card:hover .card-glow {
  opacity: 1;
}

/* 特定卡片样式 */
.ai-story-card {
  background: linear-gradient(135deg, #fff8dc 0%, #fffacd 100%);
}

.ai-story-card:hover {
  background: linear-gradient(135deg, #fffacd 0%, #fff8dc 100%);
}

.story-diffusion-card {
  background: linear-gradient(135deg, #f0fff0 0%, #e6ffe6 100%);
  border-color: #90ee90;
}

.story-diffusion-card:hover {
  background: linear-gradient(135deg, #e6ffe6 0%, #f0fff0 100%);
  border-color: #32cd32;
}

.stick-color-card {
  background: linear-gradient(135deg, #ffe6e6 0%, #ffcccc 100%);
  border-color: #ffb6c1;
}

.stick-color-card:hover {
  background: linear-gradient(135deg, #ffcccc 0%, #ffe6e6 100%);
  border-color: #ff69b4;
}

/* 底部装饰 */
.footer-decoration {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 120px;
  overflow: hidden;
  pointer-events: none;
}

.footer-waves {
  position: relative;
  width: 100%;
  height: 100%;
}

.footer-wave {
  position: absolute;
  bottom: 0;
  left: -50%;
  width: 200%;
  height: 100px;
  background: linear-gradient(90deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0.3) 50%,
      rgba(255, 255, 255, 0.1) 100%);
  border-radius: 50% 50% 0 0;
}

.footer-wave.wave1 {
  animation: footerWaveMove 8s ease-in-out infinite;
  opacity: 0.6;
}

.footer-wave.wave2 {
  animation: footerWaveMove 10s ease-in-out infinite reverse;
  opacity: 0.4;
  animation-delay: -2s;
  height: 80px;
}

@keyframes footerWaveMove {
  0%, 100% {
    transform: translateX(0%) scaleY(1);
  }
  50% {
    transform: translateX(5%) scaleY(1.2);
  }
}

/* 动画关键帧 */
@keyframes decorationFloat {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-10px) rotate(180deg);
  }
}

@keyframes decorationSpin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes starTwinkle {
  0%, 100% {
    opacity: 0.8;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

@keyframes glowPulse {
  0%, 100% {
    opacity: 0.4;
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    opacity: 0.8;
    transform: translate(-50%, -50%) scale(1.1);
  }
}

@keyframes iconBounce {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-8px) rotate(5deg);
  }
}

@keyframes textGlow {
  0%, 100% {
    text-shadow:
      3px 3px 0px #ffd700,
      6px 6px 0px #fff8dc,
      9px 9px 0px rgba(255, 99, 71, 0.3),
      0 0 20px rgba(255, 215, 0, 0.6);
  }
  50% {
    text-shadow:
      3px 3px 0px #ffd700,
      6px 6px 0px #fff8dc,
      9px 9px 0px rgba(255, 99, 71, 0.5),
      0 0 30px rgba(255, 215, 0, 1);
  }
}

@keyframes charFloat {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes lineExpand {
  0%, 100% {
    opacity: 0.3;
    transform: scaleX(0.5);
  }
  50% {
    opacity: 0.8;
    transform: scaleX(1);
  }
}

@keyframes highlightPulse {
  0%, 100% {
    text-shadow:
      2px 2px 0px #ffd700,
      4px 4px 0px #fff8dc,
      0 0 10px rgba(255, 215, 0, 0.8);
  }
  50% {
    text-shadow:
      2px 2px 0px #ffd700,
      4px 4px 0px #fff8dc,
      0 0 20px rgba(255, 215, 0, 1);
  }
}

@keyframes rayRotate {
  0% {
    transform: translate(-50%, -100%) rotate(var(--start-rotation, 0deg));
    opacity: 0.3;
  }
  50% {
    opacity: 0.7;
  }
  100% {
    transform: translate(-50%, -100%) rotate(calc(var(--start-rotation, 0deg) + 360deg));
    opacity: 0.3;
  }
}

/* 响应式设计 */
/* 大屏幕：保持4列 (默认) */

/* 中等屏幕：3列 */
@media (max-width: 1400px) and (min-width: 1001px) {
  .features-container {
    grid-template-columns: repeat(3, 1fr);
    gap: 35px;
  }
  
  .feature-card {
    min-width: 280px;
  }
}

/* 小屏幕：2列 */
@media (max-width: 1000px) and (min-width: 701px) {
  .features-container {
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }
  
  .feature-card {
    min-width: 250px;
  }
  
  .title {
    font-size: 3.5rem;
  }
  
  .subtitle {
    font-size: 1.4rem;
  }
}

/* 超小屏幕：1列 */
@media (max-width: 700px) {
  .home-page {
    padding: 15px;
    font-size: 14px;
  }
  
  .header {
    margin-bottom: 30px;
  }
  
  .title {
    font-size: 2.8rem;
    gap: 10px;
    flex-direction: column;
  }
  
  .title-icon {
    font-size: 2.5rem;
  }
  
  .subtitle {
    font-size: 1.2rem;
  }
  
  .features-container {
    grid-template-columns: 1fr;
    gap: 25px;
    padding: 0 10px;
  }
  
  .feature-card {
    padding: 30px 25px;
    border-width: 4px;
    min-width: unset;
  }
  
  .card-icon {
    font-size: 3.2rem;
    margin-bottom: 15px;
  }
  
  .card-title {
    font-size: 1.8rem;
    margin-bottom: 12px;
  }
  
  .card-description {
    font-size: 1.1rem;
    margin-bottom: 20px;
  }
  
  .feature-tag {
    font-size: 0.8rem;
    padding: 6px 12px;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 2.2rem;
  }
  
  .title-icon {
    font-size: 2rem;
  }
  
  .subtitle {
    font-size: 1rem;
  }
  
  .feature-card {
    padding: 25px 20px;
  }
  
  .card-icon {
    font-size: 2.8rem;
  }
  
  .card-title {
    font-size: 1.6rem;
  }
  
  .card-description {
    font-size: 1rem;
  }
}
</style> 