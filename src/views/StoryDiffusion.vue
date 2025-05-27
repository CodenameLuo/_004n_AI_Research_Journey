<template>
  <div class="story-diffusion">
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
            <span class="title-char" style="--delay: 0.2s">研</span>
            <span class="title-char" style="--delay: 0.3s">学</span>
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
          <span class="subtitle-highlight">用AI创造属于你的童话故事</span>
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

    <div class="main-content">
      <!-- 左侧：图片上传区 -->
      <div class="upload-section">
        <div class="section-title">
          <h2>📸 图片上传</h2>
        </div>
        <!-- 自拍照上传 -->
        <div class="selfie-upload">
          <h3>1. 上传你的自拍照</h3>
          <el-upload class="selfie-uploader" :show-file-list="false" :before-upload="handleSelfieUpload" accept=".jpg,.jpeg" drag>
            <div v-if="!selfiePreview" class="upload-placeholder">
              <el-icon class="upload-icon">
                <Plus />
              </el-icon>
              <div class="upload-text">拖拽或点击上传自拍照</div>
              <div class="upload-hint">仅支持JPG格式</div>
            </div>
            <div v-else class="image-preview">
              <img :src="selfiePreview" alt="自拍照" />
              <div class="image-overlay">
                <el-button type="danger" size="small" @click.stop="removeSelfie">
                  <el-icon>
                    <Delete />
                  </el-icon>
                </el-button>
              </div>
            </div>
          </el-upload>
        </div>
        <!-- 8张描述图片上传 -->
        <div class="description-uploads">
          <h3>2. 上传8张描述图片</h3>
          <div class="upload-grid">
            <div v-for="(item, index) in descriptionImages" :key="index" class="upload-item">
              <div class="upload-number">{{ index + 1 }}</div>
              <el-upload class="description-uploader" :show-file-list="false" :before-upload="(file) => handleDescriptionUpload(file, index)" accept=".jpg,.jpeg" drag>
                <div v-if="!item.preview" class="upload-placeholder small">
                  <el-icon>
                    <Plus />
                  </el-icon>
                  <div class="upload-text">上传图片</div>
                </div>
                <div v-else class="image-preview small">
                  <img :src="item.preview" alt="描述图片" />
                  <div class="image-overlay">
                    <el-button type="danger" size="small" @click.stop="removeDescriptionImage(index)">
                      <el-icon>
                        <Delete />
                      </el-icon>
                    </el-button>
                  </div>
                </div>
              </el-upload>
            </div>
          </div>
        </div>
      </div>

      <!-- 中间：参数设置 -->
      <div class="params-section">
        <div class="section-title">
          <h2>⚙️ 参数设置</h2>
        </div>
        <div class="params-form">
          <div class="form-item">
            <label>姓名</label>
            <input v-model="userInfo.name" placeholder="请输入你的姓名" class="cartoon-input" />
          </div>
          <div class="form-item-row">
            <label>性别</label>
            <el-radio-group v-model="userInfo.gender" size="large">
              <el-radio-button value="male">👦 男孩</el-radio-button>
              <el-radio-button value="female">👧 女孩</el-radio-button>
            </el-radio-group>
          </div>
          <div class="form-item">
            <label>图片风格</label>
            <select v-model="userInfo.style" class="cartoon-select">
              <option value="" disabled>请选择图片风格</option>
              <option v-for="option in styleOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </div>
          <div class="form-item">
            <label>图片描述</label>
            <div class="desc-list">
                          <div v-for="(desc, idx) in userInfo.descriptions" :key="idx" class="description-wrapper">
              <div class="description-number">
                <div class="number-text">{{ idx + 1 }}</div>
                <div 
                  class="voice-input-btn" 
                  :class="{ 'recording': recordingIndex === idx }"
                  @mousedown="startRecording(idx)"
                  @mouseup="stopRecording"
                  @mouseleave="stopRecording"
                  @touchstart.passive="startRecording(idx)"
                  @touchend.passive="stopRecording"
                  @touchcancel.passive="stopRecording"
                  :title="recordingIndex === idx ? '录音中...' : '按住说话'"
                >
                  <el-icon v-if="recordingIndex !== idx">
                    <Microphone />
                  </el-icon>
                  <div v-else class="recording-indicator">
                    <div class="pulse-ring"></div>
                    <el-icon>
                      <Microphone />
                    </el-icon>
                  </div>
                </div>
              </div>
              <textarea v-model="userInfo.descriptions[idx]" :placeholder="`第${idx + 1}张图片描述`" class="cartoon-textarea" rows="2"></textarea>
            </div>
            </div>
          </div>
          <el-button type="primary" size="large" @click="generateImages" :loading="isGenerating" class="generate-btn">
            <el-icon>
              <MagicStick />
            </el-icon>
            {{ isGenerating ? '正在生成...' : '生成故事图片' }}
          </el-button>
        </div>
      </div>

      <!-- 右侧：生成预览 -->
      <div class="preview-section">
        <div class="section-title">
          <h2>🖼️ 生成预览</h2>
        </div>

        <!-- 右上角操作按钮 -->
        <div class="preview-corner-actions">
          <div class="corner-button download-btn" @click="downloadAllImages" title="批量下载">
            <el-icon>
              <Download />
            </el-icon>
          </div>
          <div class="corner-button share-btn" @click="shareAllImages" title="批量分享">
            <el-icon>
              <Share />
            </el-icon>
          </div>
        </div>
        <div class="preview-grid">
          <div v-for="(image, index) in generatedImages" :key="index" class="preview-item">
            <div class="preview-placeholder" v-if="!image">
              <el-icon class="placeholder-icon">
                <Picture />
              </el-icon>
              <div class="placeholder-text">等待生成...</div>
            </div>
            <div class="preview-image" v-else>
              <img :src="image" :alt="`生成图片${index + 1}`" />
              <div class="image-actions">
                <el-button size="small" @click="downloadImage(image, index)">
                  <el-icon>
                    <Download />
                  </el-icon>
                </el-button>
                <el-button size="small" @click="shareImage(image)">
                  <el-icon>
                    <Share />
                  </el-icon>
                </el-button>
              </div>
            </div>
            <div class="preview-label">{{ index === 0 ? '封面' : index }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部：画廊组件 -->
    <div class="gallery-section">
      <Gallery />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import Gallery from '../components/Gallery.vue'
import { Plus, Delete, Picture, MagicStick, Download, Share, Microphone } from '@element-plus/icons-vue'

// 响应式数据
const userInfo = reactive({
  name: '',
  gender: '',
  style: '',
  descriptions: Array(8).fill('') // 8个描述
})

// 自拍照
const selfieImage = ref(null)
const selfiePreview = ref('')

// 8张描述图片
const descriptionImages = ref(Array(8).fill(null).map(() => ({
  image: null,
  preview: ''
})))

// 生成的9张预览图
const generatedImages = ref(Array(9).fill(null))

// 生成状态
const isGenerating = ref(false)

// 语音识别相关状态
const recordingIndex = ref(-1)
const recognition = ref(null)
const isRecognitionSupported = ref(false)
const isRecognitionActive = ref(false)

// 风格选项
const styleOptions = [
  { label: '卡通风格', value: 'cartoon' },
  { label: '动漫风格', value: 'anime' },
  { label: '写实风格', value: 'realistic' },
  { label: '奇幻风格', value: 'fantasy' },
  { label: '水彩风格', value: 'watercolor' },
  { label: '油画风格', value: 'oil_painting' }
]

// 文件上传处理
const handleSelfieUpload = (file) => {
  if (!validateImage(file)) return false
  selfieImage.value = file.raw
  const reader = new FileReader()
  reader.onload = (e) => {
    selfiePreview.value = e.target.result
  }
  reader.readAsDataURL(file.raw)
  return false // 阻止自动上传
}

const handleDescriptionUpload = (file, index) => {
  if (!validateImage(file)) return false
  descriptionImages.value[index].image = file.raw
  const reader = new FileReader()
  reader.onload = (e) => {
    descriptionImages.value[index].preview = e.target.result
  }
  reader.readAsDataURL(file.raw)
  return false
}

// 图片验证
const validateImage = (file) => {
  const isJPG = file.raw.type === 'image/jpeg'
  if (!isJPG) {
    ElMessage.error('请上传JPG格式的图片！')
    return false
  }
  return true
}

// 删除图片
const removeSelfie = () => {
  selfieImage.value = null
  selfiePreview.value = ''
}

const removeDescriptionImage = (index) => {
  descriptionImages.value[index] = {
    image: null,
    preview: ''
  }
}

// 生成图片
const generateImages = async () => {
  if (!selfieImage.value) {
    ElMessage.warning('请先上传自拍照！')
    return
  }
  if (!userInfo.name.trim()) {
    ElMessage.warning('请输入姓名！')
    return
  }
  if (!userInfo.gender) {
    ElMessage.warning('请选择性别！')
    return
  }
  if (!userInfo.style) {
    ElMessage.warning('请选择图片风格！')
    return
  }
  isGenerating.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 3000))
    generatedImages.value = Array(9).fill(null).map((_, index) =>
      `https://picsum.photos/200/200?random=${Date.now() + index}`
    )
    ElMessage.success('图片生成成功！')
  } catch (error) {
    ElMessage.error('生成失败，请重试！')
  } finally {
    isGenerating.value = false
  }
}

// 下载功能
const downloadImage = (url, index) => {
  const link = document.createElement('a')
  link.href = url
  link.download = `故事_${index + 1}.jpg`
  link.click()
}

const downloadAllImages = () => {
  generatedImages.value.forEach((url, index) => {
    if (url) downloadImage(url, index)
  })
}

// 分享功能（占位）
const shareImage = (url) => {
  ElMessage.info('分享功能即将上线！')
}

const shareAllImages = () => {
  ElMessage.info('批量分享功能即将上线！')
}

// 语音识别功能初始化
const initSpeechRecognition = () => {
  try {
    // 检查浏览器支持
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      isRecognitionSupported.value = false
      console.warn('当前浏览器不支持语音识别功能')
      return
    }

    isRecognitionSupported.value = true
    recognition.value = new SpeechRecognition()
    
    // 配置语音识别
    recognition.value.continuous = false
    recognition.value.interimResults = true
    recognition.value.lang = 'zh-CN'
    recognition.value.maxAlternatives = 1

    // 识别结果处理
    recognition.value.onresult = (event) => {
      let transcript = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript
      }
      
      // 更新对应输入框的内容
      if (recordingIndex.value >= 0) {
        userInfo.descriptions[recordingIndex.value] = transcript
      }
    }

    // 识别结束处理
    recognition.value.onend = () => {
      recordingIndex.value = -1
      isRecognitionActive.value = false
    }

    // 错误处理
    recognition.value.onerror = (event) => {
      console.error('语音识别错误:', event.error)
      recordingIndex.value = -1
      isRecognitionActive.value = false
      
      switch (event.error) {
        case 'no-speech':
          ElMessage.warning('没有检测到语音输入')
          break
        case 'network':
          ElMessage.error('网络错误，请检查网络连接')
          break
        case 'not-allowed':
          ElMessage.error('麦克风权限被拒绝，请允许使用麦克风')
          break
        default:
          ElMessage.error('语音识别失败，请重试')
      }
    }

    // 开始识别处理
    recognition.value.onstart = () => {
      console.log('开始语音识别')
      isRecognitionActive.value = true
    }

  } catch (error) {
    console.error('初始化语音识别失败:', error)
    isRecognitionSupported.value = false
  }
}

// 开始录音
const startRecording = (index) => {
  if (!isRecognitionSupported.value) {
    ElMessage.warning('当前浏览器不支持语音输入功能')
    return
  }

  // 防止重复启动
  if (isRecognitionActive.value || recordingIndex.value === index) {
    return
  }

  // 如果正在录制其他的，先停止
  if (recordingIndex.value >= 0) {
    stopRecording()
    // 给一点时间让之前的识别完全停止
    setTimeout(() => {
      startRecordingInternal(index)
    }, 100)
  } else {
    startRecordingInternal(index)
  }
}

// 内部启动录音方法
const startRecordingInternal = (index) => {
  recordingIndex.value = index
  
  try {
    recognition.value.start()
    ElMessage.info('开始语音输入，松开停止')
  } catch (error) {
    console.error('启动语音识别失败:', error)
    recordingIndex.value = -1
    isRecognitionActive.value = false
    ElMessage.error('语音输入启动失败')
  }
}

// 停止录音
const stopRecording = () => {
  if (recordingIndex.value >= 0 && recognition.value && isRecognitionActive.value) {
    try {
      recognition.value.stop()
    } catch (error) {
      console.error('停止语音识别失败:', error)
      // 即使出错也要重置状态
      recordingIndex.value = -1
      isRecognitionActive.value = false
    }
  } else {
    // 直接重置状态
    recordingIndex.value = -1
    isRecognitionActive.value = false
  }
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

// 组件挂载时初始化语音识别
onMounted(() => {
  initSpeechRecognition()
})
</script>

<style scoped>
/* 全局字体设置 - 使用本地64_fonts.ttf字体适合6-12岁儿童 */
.story-diffusion {
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

/* ========== 动态背景动画样式 ========== */

/* 波浪动画 - 覆盖整个屏幕下方1/3 */
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

  0%,
  100% {
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



/* 气泡动画 - 增加更多泡泡 */
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
.main-content,
.gallery-section {
  position: relative;
  z-index: 1;
}

/* 全局字体继承 */
.story-diffusion *,
.story-diffusion *::before,
.story-diffusion *::after {
  font-family: inherit;
  font-weight: inherit;
}

/* ========== 头部标题重新设计 ========== */
.header {
  text-align: center;
  margin-bottom: 10px;
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
  margin-bottom: -20px;
}

.title-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 100px;
  background: radial-gradient(ellipse, rgba(255, 215, 0, 0.4) 0%, transparent 70%);
  filter: blur(20px);
  animation: glowPulse 4s ease-in-out infinite;
}

.title {
  font-size: 3.5rem;
  font-family: 'CuteFont64', cursive;
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.title-icon {
  font-size: 3rem;
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

.title-separator {
  color: #ffd700;
  margin: 0 10px;
  animation: separatorGlow 2s ease-in-out infinite;
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
  right: 60%;
  animation-delay: 0s;
}

.line-right {
  left: 60%;
  right: 0;
  animation-delay: -2s;
}

/* 副标题容器 */
.subtitle-container {
  position: relative;
  z-index: 3;
}

.subtitle {
  font-size: 1.5rem;
  margin: 0;
  font-weight: 600;
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
  font-weight: 700;
  text-shadow:
    2px 2px 0px #ffd700,
    4px 4px 0px #fff8dc,
    0 0 10px rgba(255, 215, 0, 0.8);
  animation: highlightPulse 3s ease-in-out infinite;
}

.subtitle-normal {
  color: #4a2c17;
  text-shadow:
    1px 1px 0px #ffd700,
    2px 2px 0px #fff8dc,
    0 0 8px rgba(255, 215, 0, 0.6);
}

.subtitle-sparkle {
  font-size: 1.2rem;
  animation: sparkle 2s ease-in-out infinite;
}

/* 副标题装饰 */
.subtitle-decoration {
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 150px;
  height: 15px;
}

.subtitle-wave {
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg,
      transparent 0%,
      #ff8c42 20%,
      #ffd700 50%,
      #ff8c42 80%,
      transparent 100%);
  border-radius: 2px;
  animation: waveFlow 3s ease-in-out infinite;
}

/* 光芒效果 */
.light-rays {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 400px;
  pointer-events: none;
  z-index: 0;
}

.ray {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 1px;
  height: 100px;
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

/* ========== 动画定义 ========== */
@keyframes decorationFloat {

  0%,
  100% {
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

  0%,
  100% {
    opacity: 0.8;
    transform: scale(1);
  }

  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

@keyframes glowPulse {

  0%,
  100% {
    opacity: 0.4;
    transform: translate(-50%, -50%) scale(1);
  }

  50% {
    opacity: 0.8;
    transform: translate(-50%, -50%) scale(1.1);
  }
}

@keyframes iconBounce {

  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }

  50% {
    transform: translateY(-5px) rotate(10deg);
  }
}

@keyframes textGlow {

  0%,
  100% {
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

  0%,
  100% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-8px);
  }
}

@keyframes separatorGlow {

  0%,
  100% {
    opacity: 0.8;
    text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
  }

  50% {
    opacity: 1;
    text-shadow: 0 0 20px rgba(255, 215, 0, 0.8);
  }
}

@keyframes lineExpand {

  0%,
  100% {
    opacity: 0.3;
    transform: scaleX(0.5);
  }

  50% {
    opacity: 0.8;
    transform: scaleX(1);
  }
}

@keyframes highlightPulse {

  0%,
  100% {
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

@keyframes sparkle {

  0%,
  100% {
    opacity: 0.8;
    transform: rotate(0deg) scale(1);
  }

  25% {
    opacity: 1;
    transform: rotate(90deg) scale(1.1);
  }

  50% {
    opacity: 0.9;
    transform: rotate(180deg) scale(0.9);
  }

  75% {
    opacity: 1;
    transform: rotate(270deg) scale(1.1);
  }
}

@keyframes waveFlow {
  0% {
    transform: translateX(-50%) scaleX(0.8);
    opacity: 0.6;
  }

  50% {
    transform: translateX(-50%) scaleX(1.2);
    opacity: 1;
  }

  100% {
    transform: translateX(-50%) scaleX(0.8);
    opacity: 0.6;
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

.main-content {
  display: grid;
  grid-template-columns: 0.5fr 470px 1.2fr;
  gap: 25px;
  max-width: 1800px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.section-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.section-title h2 {
  color: #8b4513;
  margin: 0;
  font-size: 1.8rem;
  text-shadow: 2px 2px 0px #ffd700;
  font-weight: 500;
  letter-spacing: 2px;
  font-family: 'CuteFont64', cursive;
}

/* 上传区域样式 */
.upload-section {
  background: #fff8dc;
  border-radius: 25px;
  padding: 25px;
  border: 6px solid #f7a985;
  box-shadow: 0px 10px #ff6347;
}

.selfie-upload {
  margin-bottom: 30px;
}

.selfie-upload h3,
.description-uploads h3 {
  color: #8b4513;
  font-size: 1.4rem;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  text-shadow: 1px 1px 0px #ffd700;
  letter-spacing: 0.5px;
}

.selfie-uploader {
  width: 100%;
}

.selfie-uploader :deep(.el-upload) {
  width: 100%;
}

.selfie-uploader :deep(.el-upload-dragger) {
  width: 100%;
  height: 200px;
  border: 4px dashed #ff8c42;
  border-radius: 20px;
  background: #fff8dc;
  transition: all 0.3s ease;
  box-shadow: inset 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.selfie-uploader :deep(.el-upload-dragger:hover) {
  border-color: #ff6347;
  background: #fffacd;
  transform: translateY(-2px);
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
}

.upload-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #8b4513;
  font-weight: 700;
  text-align: center;
}


.upload-icon {
  font-size: 2.5rem;
  color: #ff8c42;
  margin-bottom: 10px;
  text-shadow: 2px 2px 0px #ffd700;
}

.upload-text {
  font-size: 1.2rem;
  text-shadow: 1px 1px 0px #ffd700;
  font-weight: 700;
  text-align: center;
}

.upload-hint {
  font-size: 1rem;
  color: #cd853f;
  font-weight: 600;
  text-align: center;
}

.image-preview {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-preview img {
  max-width: 100%;
  max-height: 100%;
  border-radius: 10px;
  object-fit: cover;
}

.image-preview.small img {
  max-height: 120px;
}

.image-overlay {
  position: absolute;
  top: 10px;
  right: 10px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.image-preview:hover .image-overlay {
  opacity: 1;
}

.upload-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.upload-item {
  position: relative;
}

.upload-number {
  position: absolute;
  top: -10px;
  left: -10px;
  background: #ff8c42;
  color: #fff;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  font-weight: 800;
  z-index: 10;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.description-uploader :deep(.el-upload-dragger) {
  width: 100%;
  height: 120px;
  border-radius: 10px;
}


/* 参数设置样式 */
.params-section {
  background: #fff8dc;
  border-radius: 25px;
  padding: 25px;
  border: 6px solid #f7a985;
  box-shadow: 0px 10px #ff6347;
  height: fit-content;
}

.params-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-item-row{
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
}

.form-item label, .form-item-row label {
  font-weight: 700;
  color: #8b4513;
  font-size: 1.3rem;
  text-shadow: 1px 1px 0px #ffd700;
  letter-spacing: 0.5px;
}

.generate-btn {
  height: 60px;
  cursor: pointer;
  font-size: 1.3rem;
  font-weight: 800;
  color: #8b4513;
  background-color: #ffffe3;
  padding: 0.8em 1.8em;
  border-radius: 50px;
  border: 6px solid rgb(247, 169, 133);
  box-shadow: 0px 8px #f32b11;
  transition: all 0.1s ease;
  letter-spacing: 1px;
}

.generate-btn:hover {
  background-color: #fff8dc;
  transform: translateY(-2px);
  box-shadow: 0px 10px #f32b11;
}

.generate-btn:active {
  position: relative;
  top: 8px;
  border: 6px solid #ffb764;
  box-shadow: 0px 0px;
}

/* 预览区域样式 */
.preview-section {
  background: #fff8dc;
  border-radius: 25px;
  padding: 25px;
  border: 6px solid #f7a985;
  box-shadow: 0px 10px #ff6347;
  position: relative;
}

/* 右上角操作按钮 */
.preview-corner-actions {
  position: absolute;
  top: 25px;
  right: 35px;
  display: flex;
  gap: 12px;
  z-index: 999;
}

.corner-button {
  width: 55px;
  height: 55px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow:
    0px 6px 12px rgba(255, 99, 71, 0.4),
    0px 3px 6px rgba(255, 140, 66, 0.3),
    inset 0px 2px 0px rgba(255, 255, 255, 0.3);
  transition: all 0.3s cubic-bezier(.4, 2, .6, 1);
  font-size: 1.4rem;
  position: relative;
  overflow: hidden;
  font-weight: 800;
}

.corner-button::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.3s ease;
}

.corner-button:hover::before {
  width: 100%;
  height: 100%;
}

.corner-button:hover {
  box-shadow:
    0px 8px 16px rgba(255, 99, 71, 0.5),
    0px 4px 8px rgba(255, 140, 66, 0.4),
    inset 0px 2px 0px rgba(255, 255, 255, 0.4);
}

.corner-button:active {
  transform: translateY(-1px) scale(1.02);
  box-shadow:
    0px 4px 8px rgba(0, 0, 0, 0.2),
    0px 2px 4px rgba(0, 0, 0, 0.1);
}

.download-btn {
  background: linear-gradient(135deg, #ffb347, #ffd700);
  color: #8b4513;
  text-shadow: 1px 1px 0px rgba(255, 255, 255, 0.5);
  border: 4px solid #f7a985;
}

.download-btn:hover {
  background: linear-gradient(135deg, #ffd700, #ffb347);
  border-color: #ff8c42;
  transform: translateY(-5px) scale(1.15);
}

.share-btn {
  background: linear-gradient(135deg, #ff8c42, #ff6347);
  color: white;
  text-shadow: 1px 1px 2px rgba(139, 69, 19, 0.5);
  border: 4px solid #f7a985;
}

.share-btn:hover {
  background: linear-gradient(135deg, #ff6347, #ff8c42);
  border-color: #ff4500;
  transform: translateY(-5px) scale(1.15);
}

.corner-button .el-icon {
  font-size: 1.4rem;
  font-weight: 800;
  z-index: 1;
  position: relative;
  filter: drop-shadow(1px 1px 2px rgba(139, 69, 19, 0.4));
}

.preview-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-top: 20px;
}

.preview-item {
  position: relative;
  aspect-ratio: 1;
  border-radius: 20px;
  overflow: hidden;
  background: #fffacd;
  border: 4px solid #f7a985;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}

.preview-label {
  position: absolute;
  bottom: 8px;
  right: 8px;
  background: #ff8c42;
  color: #fff;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 800;
  z-index: 10;
  border: 2px solid #ffd700;
  box-shadow: 0px 2px 4px rgba(255, 140, 66, 0.3);
  text-shadow: 1px 1px 0px #d2691e;
  letter-spacing: 0.5px;
  min-width: 2.5em;
  text-align: center;
}

.preview-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #8b4513;
  font-weight: 700;
}

.placeholder-icon {
  font-size: 2.5rem;
  margin-bottom: 8px;
  color: #ff8c42;
  text-shadow: 2px 2px 0px #ffd700;
}

.placeholder-text {
  font-size: 1.1rem;
  text-align: center;
  text-shadow: 1px 1px 0px #ffd700;
  font-weight: 700;
}

.preview-image {
  position: relative;
  width: 100%;
  height: 100%;
}

.preview-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-actions {
  position: absolute;
  bottom: 8px;
  right: 8px;
  display: flex;
  gap: 5px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.preview-image:hover .image-actions {
  opacity: 1;
}

/* 画廊区域 */
.gallery-section {
  margin-top: 20px;
}

/* 响应式设计 */
@media (max-width: 1600px) {
  .main-content {
    max-width: 1400px;
    gap: 20px;
  }
}

@media (max-width: 1400px) {
  .main-content {
    max-width: 1200px;
    gap: 20px;
  }
}

@media (max-width: 1200px) {
  .main-content {
    grid-template-columns: 1fr;
    gap: 20px;
    max-width: 100%;
  }

  .upload-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* 头部标题响应式设计 */
@media (max-width: 1200px) {
  .header {
    padding: 15px 10px;
  }

  .title {
    font-size: 3.2rem;
    letter-spacing: 5px;
    gap: 12px;
  }

  .title-icon {
    font-size: 2.8rem;
  }

  .subtitle {
    font-size: 1.3rem;
    letter-spacing: 1.5px;
  }
}

@media (max-width: 768px) {
  .story-diffusion {
    padding: 10px;
    font-size: 14px;
  }

  .header {
    padding: 15px 8px;
    margin-bottom: 20px;
  }

  .title {
    font-size: 2.5rem;
    letter-spacing: 3px;
    gap: 8px;
    flex-direction: column;
  }

  .title-icon {
    font-size: 2.2rem;
  }

  .subtitle {
    font-size: 1.2rem;
    letter-spacing: 1px;
    gap: 4px;
  }

  .subtitle-sparkle {
    font-size: 1rem;
  }

  .section-title h2 {
    font-size: 1.5rem;
  }

  .upload-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .preview-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .desc-list {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  /* 移动端装饰元素优化 */
  .decoration-circle {
    opacity: 0.6;
  }

  .circle-1 {
    width: 60px;
    height: 60px;
  }

  .circle-2 {
    width: 45px;
    height: 45px;
  }

  .triangle-1 {
    border-left-width: 20px;
    border-right-width: 20px;
    border-bottom-width: 35px;
  }

  .triangle-2 {
    border-left-width: 15px;
    border-right-width: 15px;
    border-bottom-width: 26px;
  }

  .decoration-star {
    font-size: 1.2rem;
  }

  .light-rays {
    width: 400px;
    height: 400px;
  }

  .ray {
    height: 100px;
  }

  /* 移动端右上角按钮优化 */
  .preview-corner-actions {
    top: 12px;
    right: 12px;
    gap: 8px;
  }

  .corner-button {
    width: 42px;
    height: 42px;
    border-width: 2px;
  }

  .corner-button .el-icon {
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .header {
    padding: 10px 5px;
  }

  .title {
    font-size: 2rem;
    letter-spacing: 1px;
  }

  .title-icon {
    font-size: 1.8rem;
  }

  .subtitle {
    font-size: 1rem;
    letter-spacing: 0.5px;
  }

  .title-glow {
    width: 250px;
    height: 60px;
  }

  .light-rays {
    width: 250px;
    height: 250px;
  }

  .ray {
    height: 60px;
  }

  /* 超小屏幕右上角按钮优化 */
  .preview-corner-actions {
    top: 10px;
    right: 10px;
    gap: 6px;
  }

  .corner-button {
    width: 36px;
    height: 36px;
    border-width: 2px;
  }

  .corner-button .el-icon {
    font-size: 1rem;
  }
}

.desc-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

/* 原生输入框卡通立体样式 */
.cartoon-input {
  border: 4px solid #f7a985;
  border-radius: 20px;
  background: #fffacd;
  color: #8b4513;
  font-weight: 700;
  box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.1);
  padding: 0.8em 1em;
  font-size: 1.1rem;
  width: 100%;
  transition: all 0.2s ease;
  letter-spacing: 0.5px;
}

.cartoon-input:focus {
  border-color: #ffb347;
  box-shadow: 0 0 0 4px #ffe4b5, 0 2px 6px #ffd700;
  outline: none;
  background: #fff8dc;
}

.cartoon-input::placeholder {
  color: #cd853f;
  font-weight: 600;
}

/* Element Plus 组件字体统一覆盖 */
.form-item :deep(.el-radio-button__inner), .form-item-row :deep(.el-radio-button__inner) {
  background: #fff8dc;
  color: #8b4513;
  border: 4px solid #f7a985;
  border-radius: 20px;
  font-weight: 700;
  font-size: 1.1rem;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  margin: 0 5px;
  letter-spacing: 0.5px;
}

.form-item :deep(.el-radio-button__original-radio:checked + .el-radio-button__inner), .form-item-row :deep(.el-radio-button__original-radio:checked + .el-radio-button__inner)   {
  background: #ff8c42;
  color: #fff;
  border-color: #ff6347;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  font-weight: 800;
}

.form-item :deep(.el-select .el-input__inner), .form-item-row :deep(.el-select .el-input__inner) {
  border: 4px solid #f7a985;
  border-radius: 20px;
  background: #fffacd;
  color: #8b4513;
  font-weight: 700;
  font-size: 1.1rem;
}



/* 图片相关立体样式 */
.image-preview img {
  max-width: 100%;
  max-height: 100%;
  border-radius: 15px;
  object-fit: cover;
  border: 4px solid #f7a985;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}

.upload-number {
  position: absolute;
  top: -12px;
  left: -12px;
  background: #ff6347;
  color: #fff;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 800;
  z-index: 10;
  border: 3px solid #f7a985;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}

.description-uploader :deep(.el-upload-dragger) {
  width: 100%;
  height: 120px;
  border-radius: 15px;
  border: 4px dashed #ff8c42;
  background: #fff8dc;
  box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.description-uploader :deep(.el-upload-dragger:hover) {
  border-color: #ff6347;
  background: #fffacd;
  transform: translateY(-1px);
}

.preview-actions {
  display: flex;
  gap: 10px;
}



.image-actions .el-button {
  font-size: 0.8rem;
  font-weight: 700;
  color: #ffaf02;
  background-color: #ffffe3;
  padding: 0.3em 0.6em;
  border-radius: 20px;
  border: 3px solid rgb(247, 169, 133);
  box-shadow: 0px 2px #f32b11;
  transition: all 0.1s ease;
}

.image-actions .el-button:hover {
  background-color: #fff8dc;
  transform: translateY(-1px);
  box-shadow: 0px 3px #f32b11;
}

.image-actions .el-button:active {
  position: relative;
  top: 2px;
  border: 3px solid #ffb764;
  box-shadow: 0px 0px;
}

/* 删除按钮样式 */
.image-overlay .el-button {
  font-size: 0.8rem;
  font-weight: 700;
  color: #fff;
  background-color: #ff6347;
  padding: 0.3em 0.6em;
  border-radius: 20px;
  border: 3px solid #f7a985;
  box-shadow: 0px 2px #8b0000;
  transition: all 0.1s ease;
}

.image-overlay .el-button:hover {
  background-color: #ff4500;
  transform: translateY(-1px);
  box-shadow: 0px 3px #8b0000;
}

.image-overlay .el-button:active {
  position: relative;
  top: 2px;
  border: 3px solid #cd5c5c;
  box-shadow: 0px 0px;
}

/* 响应式设计更新 */
@media (max-width: 768px) {

  .upload-section,
  .params-section,
  .preview-section {
    border-width: 4px;
    box-shadow: 0px 6px #ff6347;
  }

  .description-number {
    min-width: 2.5em;
    padding: 0.6em 0.8em;
    gap: 0.2em;
  }

  .number-text {
    font-size: 0.9rem;
  }

  .voice-input-btn {
    width: 1.5em;
    height: 1.5em;
    border-width: 1px;
  }

  .voice-input-btn .el-icon {
    font-size: 0.9rem;
  }
}

/* 标题icon装饰 */
.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-icon {
  display: flex;
  align-items: center;
  margin-right: 4px;
}


/* 按钮、输入框、单选按钮hover/active动画优化 */
.generate-btn,
.preview-actions .el-button,
.image-actions .el-button {
  transition: all 0.15s cubic-bezier(.4, 2, .6, 1);
}

.generate-btn:active,
.preview-actions .el-button:active,
.image-actions .el-button:active {
  filter: brightness(0.95) drop-shadow(0 1px 0 #ffd700);
}

.form-item :deep(.el-radio-button__inner):hover, .form-item-row :deep(.el-radio-button__inner):hover {
  background: #fffacd !important;
  color: #ff6347 !important;
  border-color: #ffb347 !important;
}

.form-item :deep(.el-radio-button__original-radio:checked + .el-radio-button__inner), .form-item-row :deep(.el-radio-button__original-radio:checked + .el-radio-button__inner) {
  background: #ff8c42 !important;
  color: #fff !important;
  border-color: #ff6347 !important;
  box-shadow: 0px 4px 12px #ffd700 !important;
}

/* 原生下拉框卡通立体样式 */
.cartoon-select {
  border: 4px solid #f7a985;
  border-radius: 20px;
  background: #fffacd;
  color: #8b4513;
  font-weight: 700;
  box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.1);
  padding: 0.8em 1em;
  font-size: 1.1rem;
  width: 100%;
  transition: all 0.2s ease;
  cursor: pointer;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: url('data:image/svg+xml;utf8,<svg fill="%23ff8c42" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>');
  background-repeat: no-repeat;
  background-position: right 0.8em center;
  background-size: 1.2em;
  padding-right: 2.5em;
  letter-spacing: 0.5px;
}

.cartoon-select:focus {
  border-color: #ffb347;
  box-shadow: 0 0 0 4px #ffe4b5, 0 2px 6px #ffd700;
  outline: none;
  background-color: #fff8dc;
}

.cartoon-select:hover {
  background-color: #fff8dc;
  transform: translateY(-1px);
  box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.1), 0px 4px 8px rgba(0, 0, 0, 0.1);
}

/* 优化下拉菜单选项样式 - 更大更协调 */
.cartoon-select option {
  background: #fff8dc;
  color: #8b4513;
  font-weight: 700;
  font-size: 1.2rem;
  padding: 15px 20px;
  border-radius: 8px;
  margin: 2px 0;
  letter-spacing: 0.5px;
  line-height: 1.8;
  min-height: 45px;
  text-shadow: 0.5px 0.5px 0px rgba(255, 215, 0, 0.3);
}

/* 悬浮状态 - 温暖的卡通色系 */
.cartoon-select option:hover {
  background: linear-gradient(135deg, #fffacd 0%, #ffe4b5 100%);
  color: #ff6347;
  font-weight: 800;
  text-shadow: 1px 1px 0px rgba(255, 215, 0, 0.6);
  transform: scale(1.02);
  transition: all 0.2s ease;
  border: 2px solid #ffb347;
  box-shadow: 0 2px 8px rgba(255, 140, 66, 0.3);
}

/* 选中状态 - 更鲜艳的卡通配色 */
.cartoon-select option:checked {
  background: linear-gradient(135deg, #ff8c42 0%, #ffb347 100%);
  color: #fff;
  font-weight: 800;
  text-shadow: 1px 1px 2px rgba(139, 69, 19, 0.5);
  border: 2px solid #f7a985;
  box-shadow: 
    0 3px 10px rgba(255, 99, 71, 0.4),
    inset 0 1px 0px rgba(255, 255, 255, 0.3);
}

/* 选中且悬浮状态 */
.cartoon-select option:checked:hover {
  background: linear-gradient(135deg, #ffb347 0%, #ffd700 100%);
  transform: scale(1.03);
  box-shadow: 
    0 4px 12px rgba(255, 99, 71, 0.5),
    inset 0 1px 0px rgba(255, 255, 255, 0.4);
}

/* 原生文本域卡通立体样式 */
.description-wrapper {
  display: flex;
  align-items: stretch;
  gap: 0;
}

.description-number {
  background: #ff8c42;
  color: #fff;
  padding: 0.8em 1em;
  border: 4px solid #f7a985;
  border-radius: 15px 0 0 15px;
  font-weight: 800;
  font-size: 1rem;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 3em;
  border-right: none;
  height: auto;
  gap: 0.3em;
}

.number-text {
  font-size: 1rem;
  font-weight: 800;
}

.voice-input-btn {
  width: 1.8em;
  height: 1.8em;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  color: #ff8c42;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  user-select: none;
  position: relative;
}

.voice-input-btn:hover {
  background: #fff;
  transform: scale(1.1);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
}

.voice-input-btn:active {
  transform: scale(0.95);
}

.voice-input-btn.recording {
  background: #ff6347;
  color: #fff;
  animation: voiceButtonPulse 1s ease-in-out infinite;
}

.recording-indicator {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.pulse-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200%;
  height: 200%;
  border: 2px solid rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  animation: pulsering 1.5s ease-out infinite;
}

/* 语音按钮动画 */
@keyframes voiceButtonPulse {
  0%, 100% {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2), 0 0 0 0 rgba(255, 99, 71, 0.7);
  }
  50% {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2), 0 0 0 8px rgba(255, 99, 71, 0);
  }
}

@keyframes pulsering {
  0% {
    transform: translate(-50%, -50%) scale(0.8);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(1.5);
    opacity: 0;
  }
}

.cartoon-textarea {
  border: 4px solid #f7a985;
  border-left: none;
  border-radius: 0 15px 15px 0;
  background: #fff8dc;
  color: #8b4513;
  font-weight: 700;
  font-size: 1rem;
  box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.1);
  padding: 0.8em 1em;
  width: 100%;
  transition: all 0.2s ease;
  letter-spacing: 0.5px;
  line-height: 1.5;
  resize: none;
  min-height: 3.2em;
  max-height: 6em; /* 限制最大高度，超出时显示滚动条 */
  height: auto;
  overflow-y: auto; /* 允许垂直滚动 */
}

.cartoon-textarea:focus {
  border-color: #ffb347;
  box-shadow: 0 0 0 4px #ffe4b5, 0 2px 6px #ffd700;
  outline: none;
  background: #fff8dc;
}

.cartoon-textarea::placeholder {
  color: #cd853f;
  font-weight: 600;
}

/* 自定义滚动条样式 - 卡通风格 */
.cartoon-textarea::-webkit-scrollbar {
  width: 12px;
  background: transparent;
}

.cartoon-textarea::-webkit-scrollbar-track {
  background: rgba(255, 215, 0, 0.2);
  border-radius: 10px;
  margin: 4px;
  border: 2px solid rgba(247, 169, 133, 0.5);
}

.cartoon-textarea::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #ff8c42, #ffb347);
  border-radius: 10px;
  border: 2px solid #f7a985;
  box-shadow: 
    0px 2px 4px rgba(0, 0, 0, 0.2),
    inset 0px 1px 0px rgba(255, 255, 255, 0.3);
  transition: all 0.2s ease;
}

.cartoon-textarea::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #ffb347, #ffd700);
  border-color: #ff8c42;
  box-shadow: 
    0px 3px 6px rgba(0, 0, 0, 0.3),
    inset 0px 1px 0px rgba(255, 255, 255, 0.4);
  transform: scale(1.05);
}

.cartoon-textarea::-webkit-scrollbar-thumb:active {
  background: linear-gradient(135deg, #ff6347, #ff8c42);
  box-shadow: 
    0px 1px 2px rgba(0, 0, 0, 0.3),
    inset 0px 1px 0px rgba(255, 255, 255, 0.2);
  transform: scale(0.95);
}

.cartoon-textarea::-webkit-scrollbar-corner {
  background: transparent;
}

/* Firefox 滚动条样式 */
.cartoon-textarea {
  scrollbar-width: thin;
  scrollbar-color: #ff8c42 rgba(255, 215, 0, 0.2);
}

/* Element Plus 全局字体覆盖 */
:deep(.el-button) {
  font-weight: 700;
  letter-spacing: 0.5px;
}

:deep(.el-input__inner) {
  font-weight: 700;
  letter-spacing: 0.5px;
}

:deep(.el-textarea__inner) {
  font-weight: 700;
  line-height: 1.5;
}

:deep(.el-radio-button__inner) {
  font-weight: 700;
  letter-spacing: 0.5px;
}

:deep(.el-upload-dragger .el-upload__text) {
  font-weight: 700;
  font-size: 1.1rem;
  color: #8b4513;
}

:deep(.el-icon) {
  font-weight: 800;
}
</style>
