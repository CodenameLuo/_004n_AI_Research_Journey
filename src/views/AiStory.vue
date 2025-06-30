<template>
  <div class="ai-story">
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
            <span class="title-char" style="--delay: 0.2s">漫</span>
            <span class="title-char" style="--delay: 0.3s">画</span>
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
          <span class="subtitle-highlight">让AI把你变成漫画主角</span>
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
      <!-- 左侧：上传照片区域 -->
      <div class="upload-section">
        <div class="section-title">
          <h2>📷 上传照片</h2>
        </div>
        
        <!-- 自拍照上传 -->
        <div class="selfie-upload">
          <el-upload class="selfie-uploader" :show-file-list="false" :before-upload="handleSelfieUpload" accept=".jpg,.jpeg,.png" drag>
            <div v-if="!selfiePreview" class="upload-placeholder">
              <el-icon class="upload-icon">
                <Plus />
              </el-icon>
              <div class="upload-text">拖拽或点击上传自拍照</div>
              <div class="upload-hint">支持JPG、PNG格式，小于10MB</div>
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
      </div>

      <!-- 中间：故事描述区域 -->
      <div class="description-section">
        <div class="section-title">
          <h2>📖 故事描述</h2>
        </div>
        
        <!-- 图片风格选择 -->
        <div class="style-form">
          <div class="form-item">
            <label>图片风格</label>
            <div class="custom-select-wrapper">
              <div 
                class="custom-select" 
                :class="{ 'is-open': isStyleSelectOpen }"
                @click="toggleStyleSelect"
              >
                <div class="select-display">
                  {{ userInfo.style ? styleOptions.find(opt => opt.value === userInfo.style)?.label : '请选择图片风格' }}
                </div>
                <div class="select-arrow">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 10l5 5 5-5z"/>
                  </svg>
                </div>
              </div>
              <div class="select-options" v-show="isStyleSelectOpen">
                <div 
                  class="select-option"
                  :class="{ 'is-selected': userInfo.style === option.value }"
                  v-for="option in styleOptions" 
                  :key="option.value"
                  @click="selectStyle(option.value)"
                >
                  {{ option.label }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="description-content">
          <div class="description-header">
            <div class="description-controls">
              <div 
                class="voice-input-btn" 
                :class="{ 'recording': isRecording }"
                @mousedown="startRecording"
                @mouseup="stopRecording"
                @mouseleave="stopRecording"
                @touchstart.passive="startRecording"
                @touchend.passive="stopRecording"
                @touchcancel.passive="stopRecording"
                :title="isRecording ? '录音中...' : '按住说话'"
              >
                <el-icon v-if="!isRecording">
                  <Microphone />
                </el-icon>
                <div v-else class="recording-indicator">
                  <div class="pulse-ring"></div>
                  <el-icon>
                    <Microphone />
                  </el-icon>
                </div>
              </div>
              <el-button 
                type="warning" 
                size="small" 
                @click="clearDescription"
                :disabled="!userInfo.description.trim()"
                class="clear-btn"
              >
                <el-icon>
                  <Delete />
                </el-icon>
                清空
              </el-button>
            </div>
          </div>
          
          <textarea 
            v-model="userInfo.description" 
            placeholder="请详细描述你想要的漫画场景，比如：我站在樱花树下，穿着校服，背景是蓝天白云，手里拿着一本书，表情很开心..." 
            class="description-textarea" 
            rows="12"
            @input="handleDescriptionInput"
          ></textarea>
          
          <div class="description-footer">
                      <div class="word-count">
            字数：{{ userInfo.description.length }}
          </div>
          </div>
        </div>
        
        <div class="generate-btn-wrapper">
          <el-button 
            type="primary" 
            size="large" 
            @click="generateComic" 
            :loading="isGenerating" 
            :disabled="!selfieImage || !userInfo.style || !userInfo.description.trim()"
            class="generate-btn"
          >
            <el-icon>
              <MagicStick />
            </el-icon>
            {{ isGenerating ? '正在生成中...' : '生成我的漫画' }}
          </el-button>
        </div>
      </div>

      <!-- 右侧：输出区域 -->
      <div class="output-section">
        <div class="section-title">
          <h2>🖼️ 漫画生成</h2>
        </div>

        <!-- 右上角操作按钮 -->
        <div class="output-corner-actions" v-if="generatedComic">
          <div 
            class="corner-button download-btn" 
            @click="downloadComic" 
            title="下载漫画"
          >
            <el-icon>
              <Download />
            </el-icon>
          </div>
          <div 
            class="corner-button share-btn" 
            @click="shareComic" 
            title="分享漫画"
          >
            <el-icon>
              <Share />
            </el-icon>
          </div>
        </div>
        
        <div class="comic-preview">
          <div class="preview-placeholder" v-if="!generatedComic">
            <el-icon class="placeholder-icon">
              <Picture />
            </el-icon>
            <div class="placeholder-text">您的专属漫画将在这里生成</div>
            <div class="placeholder-hint">上传自拍照并填写描述后开始创作</div>
          </div>
          <div class="preview-image" v-else>
            <img :src="generatedComic" alt="生成的漫画" />
          </div>
        </div>
      </div>
    </div>

    <!-- 原生消息提示容器 -->
    <div class="native-message-container">
      <div 
        v-for="message in messages" 
        :key="message.id"
        :class="[
          'native-message', 
          `native-message--${message.type}`,
          { 'native-message--visible': message.visible }
        ]"
        @click="closeMessage(message.id)"
      >
        <div class="native-message__icon">
          <span v-if="message.type === 'success'">✅</span>
          <span v-else-if="message.type === 'error'">❌</span>
          <span v-else-if="message.type === 'warning'">⚠️</span>
          <span v-else>ℹ️</span>
        </div>
        <div class="native-message__content">{{ message.content }}</div>
        <div class="native-message__close">✕</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { Plus, Delete, Picture, MagicStick, Download, Share, Microphone } from '@element-plus/icons-vue'

// 响应式数据
const userInfo = reactive({
  style: '',
  description: '' // 一整段描述
})

// 自拍照
const selfieImage = ref(null)
const selfiePreview = ref('')

// 生成的漫画
const generatedComic = ref(null)

// 生成状态
const isGenerating = ref(false)

// 语音识别相关状态
const isRecording = ref(false)
const recognition = ref(null)
const isRecognitionSupported = ref(false)
const isRecognitionActive = ref(false)

// 自定义下拉菜单状态
const isStyleSelectOpen = ref(false)

// 风格选项 - 对应后端支持的风格
const styleOptions = [
  { label: '写实风', value: '写实风' },
  { label: '日本漫画风', value: '日本漫画风' },
  { label: '数字油画风', value: '数字油画风' },
  { label: '迪士尼皮克斯风', value: '迪士尼皮克斯风' },
  { label: '摄影写真风格', value: '摄影写真风格' },
  { label: '漫画书风格', value: '漫画书风格' },
  { label: '艺术线条风', value: '艺术线条风' },
  { label: '黑白电影风', value: '黑白电影风' },
  { label: '3D建模风', value: '3D建模风' }
]

// 原生消息提示系统
const messages = ref([])
let messageId = 0

// 显示消息的方法
const showMessage = (content, type = 'info', duration = 3000) => {
  const id = ++messageId
  const message = {
    id,
    content,
    type, // success, error, warning, info
    visible: true
  }
  
  messages.value.push(message)
  
  // 自动隐藏
  setTimeout(() => {
    const index = messages.value.findIndex(m => m.id === id)
    if (index > -1) {
      messages.value[index].visible = false
      // 动画结束后移除
      setTimeout(() => {
        const removeIndex = messages.value.findIndex(m => m.id === id)
        if (removeIndex > -1) {
          messages.value.splice(removeIndex, 1)
        }
      }, 300)
    }
  }, duration)
}

// 消息类型方法
const NativeMessage = {
  success: (content, duration) => showMessage(content, 'success', duration),
  error: (content, duration) => showMessage(content, 'error', duration),
  warning: (content, duration) => showMessage(content, 'warning', duration),
  info: (content, duration) => showMessage(content, 'info', duration)
}

// 手动关闭消息
const closeMessage = (id) => {
  const index = messages.value.findIndex(m => m.id === id)
  if (index > -1) {
    messages.value[index].visible = false
    setTimeout(() => {
      const removeIndex = messages.value.findIndex(m => m.id === id)
      if (removeIndex > -1) {
        messages.value.splice(removeIndex, 1)
      }
    }, 300)
  }
}

// 文件上传处理
const handleSelfieUpload = (file) => {
  if (!validateImage(file)) return false
  selfieImage.value = file
  const reader = new FileReader()
  reader.onload = (e) => {
    selfiePreview.value = e.target.result
  }
  reader.readAsDataURL(file)
  NativeMessage.success('自拍照上传成功！')
  return false // 阻止自动上传
}

// 图片验证
const validateImage = (file) => {
  const isJPG = file.type === 'image/jpeg' || file.type === 'image/jpg'
  const isPNG = file.type === 'image/png'
  if (!isJPG && !isPNG) {
    NativeMessage.error('请上传JPG或PNG格式的图片！')
    return false
  }
  const isLt10M = file.size / 1024 / 1024 < 10
  if (!isLt10M) {
    NativeMessage.error('图片大小不能超过10MB！')
    return false
  }
  return true
}

// 删除图片
const removeSelfie = () => {
  selfieImage.value = null
  selfiePreview.value = ''
  NativeMessage.info('已移除自拍照')
}

// 清空描述
const clearDescription = () => {
  if (userInfo.description.trim()) {
    userInfo.description = ''
    NativeMessage.info('故事描述已清空')
  }
}

// 处理描述输入
const handleDescriptionInput = (event) => {
  // 保留事件处理器以备将来使用
}

// 生成漫画
const generateComic = async () => {
  // 验证输入
  if (!selfieImage.value) {
    NativeMessage.warning('请先上传自拍照！')
    return
  }
  if (!userInfo.style) {
    NativeMessage.warning('请选择图片风格！')
    return
  }
  if (!userInfo.description.trim()) {
    NativeMessage.warning('请填写故事描述！')
    return
  }
  
  isGenerating.value = true
  
  try {
    NativeMessage.info('正在生成您的专属漫画，请稍候...')
    
    // 模拟生成过程
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // 模拟生成结果 - 使用示例图片
    generatedComic.value = 'https://picsum.photos/400/600?random=' + Date.now()
    
    NativeMessage.success('您的专属漫画生成成功！')
    
  } catch (error) {
    console.error('生成错误:', error)
    NativeMessage.error('漫画生成失败，请重试！')
    generatedComic.value = null
  } finally {
    isGenerating.value = false
  }
}

// 下载功能
const downloadComic = () => {
  if (!generatedComic.value) {
    NativeMessage.warning('请先生成漫画！')
    return
  }
  
  // 如果是base64图片，直接下载
  if (generatedComic.value.startsWith('data:image')) {
    const link = document.createElement('a')
    link.href = generatedComic.value
    link.download = 'AI_漫画.png'
    link.click()
  } else {
    // 如果是URL，获取后下载
    fetch(generatedComic.value)
      .then(response => response.blob())
      .then(blob => {
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = 'AI_漫画.png'
        link.click()
        URL.revokeObjectURL(link.href)
      })
      .catch(error => {
        console.error('下载失败:', error)
        NativeMessage.error('下载失败！')
      })
  }
  
  NativeMessage.success('开始下载漫画...')
}

// 分享功能
const shareComic = async () => {
  if (!generatedComic.value) {
    NativeMessage.warning('请先生成漫画！')
    return
  }
  
  try {
    NativeMessage.info('准备分享您的漫画作品...')
    
    // 这里可以添加分享到社交媒体或画廊的逻辑
    // 目前先简单复制到剪贴板或显示分享提示
    
    if (navigator.share) {
      // 使用Web Share API（如果支持）
      await navigator.share({
        title: 'AI漫画作品',
        text: `看看我用AI生成的漫画！风格：${userInfo.style}`,
        url: generatedComic.value
      })
      NativeMessage.success('分享成功！')
    } else {
      // 备用分享方式
      NativeMessage.success('您的漫画已准备好分享！')
    }
    
  } catch (error) {
    console.error('分享失败:', error)
    NativeMessage.error('分享失败，请重试！')
  }
}

// 自定义下拉菜单方法
const toggleStyleSelect = () => {
  isStyleSelectOpen.value = !isStyleSelectOpen.value
}

const selectStyle = (value) => {
  userInfo.style = value
  isStyleSelectOpen.value = false
  NativeMessage.success(`已选择风格：${styleOptions.find(opt => opt.value === value)?.label}`)
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
      let finalTranscript = ''
      
      // 只处理最终确定的结果，避免重复输入
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript
        }
      }
      
      // 只有当有最终确定的转录结果时才处理
      if (finalTranscript.trim()) {
        if (userInfo.description.trim()) {
          // 检查当前描述是否以标点符号结尾
          const lastChar = userInfo.description.trim().slice(-1)
          const needsSeparator = !['.', '。', ',', '，', '!', '！', '?', '？', ';', '；'].includes(lastChar)
          
          // 添加新的语音输入内容
          const separator = needsSeparator ? '，' : ''
          userInfo.description += separator + finalTranscript
                  } else {
            // 如果描述为空，直接设置
            userInfo.description = finalTranscript
          }
      }
    }

    // 识别结束处理
    recognition.value.onend = () => {
      isRecording.value = false
      isRecognitionActive.value = false
      NativeMessage.info('语音输入结束')
    }

    // 错误处理
    recognition.value.onerror = (event) => {
      console.error('语音识别错误:', event.error)
      isRecording.value = false
      isRecognitionActive.value = false
      
      switch (event.error) {
        case 'no-speech':
          NativeMessage.warning('没有检测到语音输入')
          break
        case 'network':
          NativeMessage.error('网络错误，请检查网络连接')
          break
        case 'not-allowed':
          NativeMessage.error('麦克风权限被拒绝，请允许使用麦克风')
          break
        default:
          NativeMessage.error('语音识别失败，请重试')
      }
    }

    // 开始识别处理
    recognition.value.onstart = () => {
      console.log('开始语音识别')
      isRecognitionActive.value = true
      NativeMessage.info('开始语音输入，松开停止')
    }

  } catch (error) {
    console.error('初始化语音识别失败:', error)
    isRecognitionSupported.value = false
  }
}

// 开始录音
const startRecording = () => {
  if (!isRecognitionSupported.value) {
    NativeMessage.warning('当前浏览器不支持语音输入功能')
    return
  }

  // 防止重复启动
  if (isRecognitionActive.value || isRecording.value) {
    return
  }

  isRecording.value = true
  
  try {
    recognition.value.start()
  } catch (error) {
    console.error('启动语音识别失败:', error)
    isRecording.value = false
    isRecognitionActive.value = false
    NativeMessage.error('语音输入启动失败')
  }
}

// 停止录音
const stopRecording = () => {
  if (isRecording.value && recognition.value && isRecognitionActive.value) {
    try {
      recognition.value.stop()
    } catch (error) {
      console.error('停止语音识别失败:', error)
      // 即使出错也要重置状态
      isRecording.value = false
      isRecognitionActive.value = false
    }
  } else {
    // 直接重置状态
    isRecording.value = false
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

// 点击外部关闭下拉菜单
const handleClickOutside = (event) => {
  const selectWrapper = event.target.closest('.custom-select-wrapper')
  if (!selectWrapper) {
    isStyleSelectOpen.value = false
  }
}

// 组件挂载时初始化语音识别
onMounted(() => {
  initSpeechRecognition()
  document.addEventListener('click', handleClickOutside)
})

// 组件卸载时清理事件监听
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* 全局字体设置 - 使用本地64_fonts.ttf字体适合6-12岁儿童 */
.ai-story {
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
.main-content {
  position: relative;
  z-index: 1;
}

/* 全局字体继承 */
.ai-story *,
.ai-story *::before,
.ai-story *::after {
  font-family: inherit;
  font-weight: inherit;
}

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
    transform: translateY(-5px) rotate(10deg);
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
    transform: translateY(-8px);
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

/* 主内容区域 */
.main-content {
  display: grid;
  grid-template-columns: 0.8fr 1.2fr 1fr;
  gap: 25px;
  max-width: 1800px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

/* 三个区域共同样式 */
.upload-section,
.description-section,
.output-section {
  background: #fff8dc;
  border-radius: 25px;
  padding: 25px;
  border: 6px solid #f7a985;
  box-shadow: 0px 10px #ff6347;
  position: relative;
}

/* 上传区域特殊布局 */
.upload-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* 输出区域特殊布局 */
.output-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
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

/* 上传照片区域样式 */
.selfie-upload {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* 风格选择表单样式 */
.style-form {
  margin-bottom: 20px;
}

.style-form .form-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.style-form .form-item label {
  color: #8b4513;
  font-size: 1.2rem;
  text-shadow: 1px 1px 0px #ffd700;
  letter-spacing: 0.5px;
}

/* 描述区域样式 */
.description-content {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.description-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.description-controls {
  display: flex;
  align-items: center;
  gap: 12px;
}

.description-textarea {
  border: 4px solid #f7a985;
  border-radius: 20px;
  background: #fff8dc;
  color: #8b4513;
  font-size: 1rem;
  box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1em 1.2em;
  width: 100%;
  transition: all 0.2s ease;
  letter-spacing: 0.5px;
  line-height: 1.6;
  resize: vertical;
  min-height: 240px;
  max-height: 400px;
  overflow-y: auto;
}

.description-textarea:focus {
  border-color: #ffb347;
  box-shadow: 0 0 0 4px #ffe4b5, 0 2px 6px #ffd700;
  outline: none;
  background: #fff8dc;
}

.description-textarea::placeholder {
  color: #cd853f;
  line-height: 1.6;
}

.description-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: -5px;
}

.word-count {
  color: #8b4513;
  font-size: 0.9rem;
  text-shadow: 1px 1px 0px rgba(255, 255, 255, 0.5);
  opacity: 0.8;
}

.clear-btn {
  height: 35px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 700;
  color: #8b4513;
  background-color: #ffe4b5;
  padding: 0.5em 1em;
  border-radius: 18px;
  border: 3px solid #f7a985;
  box-shadow: 0px 3px #cd853f;
  transition: all 0.1s ease;
  letter-spacing: 0.5px;
}

.clear-btn:hover:not(:disabled) {
  background-color: #ffd700;
  transform: translateY(-1px);
  box-shadow: 0px 4px #cd853f;
}

.clear-btn:active:not(:disabled) {
  position: relative;
  top: 3px;
  box-shadow: 0px 0px;
}

.clear-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: #f5f5dc !important;
  color: #999 !important;
}

.clear-btn:disabled:hover {
  transform: none !important;
  box-shadow: 0px 3px #cd853f !important;
}

/* 独立的语音按钮样式 */
.description-controls .voice-input-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff8c42, #ffb347);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 3px solid #f7a985;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  user-select: none;
  position: relative;
  text-shadow: 1px 1px 2px rgba(139, 69, 19, 0.5);
}

.description-controls .voice-input-btn:hover {
  background: linear-gradient(135deg, #ffb347, #ffd700);
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
}

.description-controls .voice-input-btn:active {
  transform: translateY(0) scale(0.98);
}

.description-controls .voice-input-btn.recording {
  background: linear-gradient(135deg, #ff6347, #ff4500);
  animation: voiceButtonPulse 1s ease-in-out infinite;
  box-shadow: 
    0 3px 6px rgba(0, 0, 0, 0.2), 
    0 0 20px rgba(255, 99, 71, 0.6);
}

.selfie-upload h3 {
  color: #8b4513;
  font-size: 1.4rem;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  text-shadow: 1px 1px 0px #ffd700;
  letter-spacing: 0.5px;
}

.selfie-uploader {
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.selfie-uploader :deep(.el-upload) {
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.selfie-uploader :deep(.el-upload-dragger) {
  width: 100%;
  flex: 1;
  min-height: 300px;
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
  text-align: center;
}

.upload-hint {
  font-size: 1rem;
  color: #cd853f;
  text-align: center;
}

.image-preview {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.image-preview img {
  max-width: 100%;
  max-height: 100%;
  border-radius: 10px;
  object-fit: cover;
  border: 4px solid #f7a985;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}

.image-overlay {
  position: absolute;
  top: -30px;
  right: 3px;
  opacity: 1;
  transition: opacity 0.3s ease;
}

.image-overlay .el-button {
  font-size: 0.8rem;
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



/* 原生输入框卡通立体样式 */
.cartoon-input {
  border: 4px solid #f7a985;
  border-radius: 20px;
  background: #fffacd;
  color: #8b4513;
  box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.1);
  padding: 0.8em 1em;
  font-size: 1.2rem;
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
}

/* Element Plus 组件字体统一覆盖 */
.form-item :deep(.el-radio-button__inner), 
.form-item-row :deep(.el-radio-button__inner) {
  background: #fff8dc;
  color: #8b4513;
  border: 4px solid #f7a985;
  border-radius: 20px;
  font-size: 1.1rem;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  margin: 0 5px;
  letter-spacing: 0.5px;
}

.form-item :deep(.el-radio-button__original-radio:checked + .el-radio-button__inner), 
.form-item-row :deep(.el-radio-button__original-radio:checked + .el-radio-button__inner) {
  background: #ff8c42;
  color: #fff;
  border-color: #ff6347;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  font-weight: 800;
}

/* 自定义下拉菜单样式 */
.custom-select-wrapper {
  position: relative;
  width: 100%;
}

.custom-select {
  border: 4px solid #f7a985;
  border-radius: 20px;
  background: #fffacd;
  color: #8b4513;
  box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.1);
  padding: 0.8em 1em;
  font-size: 1.1rem;
  width: 100%;
  transition: all 0.2s ease;
  cursor: pointer;
  letter-spacing: 0.5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 48px;
}

.custom-select:hover {
  background-color: #fff8dc;
  border-color: #ffb347;
  transform: translateY(-2px);
  box-shadow: 
    inset 0px 2px 4px rgba(0, 0, 0, 0.1), 
    0px 6px 12px rgba(255, 140, 66, 0.3),
    0px 2px 6px rgba(255, 215, 0, 0.4);
}

.custom-select.is-open {
  border-color: #ff8c42;
  box-shadow: 0 0 0 4px rgba(255, 179, 71, 0.4), 0 4px 12px rgba(255, 215, 0, 0.6);
  background-color: #fff8dc;
  transform: translateY(-1px);
}

.select-display {
  flex: 1;
  text-align: left;
}

.select-arrow {
  color: #ff8c42;
  transition: transform 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
}

.custom-select.is-open .select-arrow {
  transform: rotate(180deg);
}

.select-options {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #fff8dc;
  border: 4px solid #ff8c42;
  border-top: none;
  border-radius: 0 0 20px 20px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  max-height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
}

.select-option {
  background: #fff8dc;
  color: #8b4513;
  font-size: 1.4rem;
  padding: 16px 20px;
  line-height: 1.8;
  border-bottom: 1px solid #f7a985;
  cursor: pointer;
  min-height: 55px;
  display: flex;
  align-items: center;
  transition: all 0.2s ease;
  letter-spacing: 0.5px;
  width: 100%;
  box-sizing: border-box;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.select-option:last-child {
  border-bottom: none;
  border-radius: 0 0 16px 16px;
}

.select-option:hover {
  background: #ffb347 !important;
  background-color: #ffb347 !important;
  color: #fff !important;
  font-weight: 800;
  text-shadow: 1px 1px 2px rgba(139, 69, 19, 0.5);
  transform: scale(1.02);
}

.select-option.is-selected {
  background: #ff8c42 !important;
  background-color: #ff8c42 !important;
  color: #fff !important;
  font-weight: 800;
  text-shadow: 1px 1px 2px rgba(139, 69, 19, 0.5);
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
}

.select-option.is-selected:hover {
  background: #ff6347 !important;
  background-color: #ff6347 !important;
}

/* 语音按钮共用样式 */
.voice-input-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;
  position: relative;
}

.voice-input-btn:hover {
  transform: scale(1.05);
}

.voice-input-btn:active {
  transform: scale(0.95);
}

.voice-input-btn.recording {
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

/* 生成按钮包装器 */
.generate-btn-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -20px;
}

/* 生成按钮 */
.generate-btn {
  height: 60px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 800;
  color: #8b4513;
  background-color: #ffffe3;
  padding: 0.8em 2.5em;
  border-radius: 50px;
  border: 6px solid rgb(247, 169, 133);
  box-shadow: 0px 8px #f32b11;
  transition: all 0.1s ease;
  letter-spacing: 1px;
  white-space: nowrap;
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

.generate-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background-color: #f5f5dc !important;
  border-color: #ddd !important;
  color: #999 !important;
}

.generate-btn:disabled:hover {
  transform: none !important;
  box-shadow: 0px 8px #f32b11 !important;
}

/* 输出区域样式 */
.output-section {
  position: relative;
}

/* 右上角操作按钮 */
.output-corner-actions {
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

/* 漫画预览区域 */
.comic-preview {
  width: 100%;
  flex: 1;
  border-radius: 20px;
  overflow: hidden;
  background: #fffacd;
  border: 4px solid #f7a985;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  min-height: 400px;
}

.preview-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #8b4513;
  text-align: center;
  padding: 20px;
}

.placeholder-icon {
  font-size: 4rem;
  margin-bottom: 20px;
  color: #ff8c42;
  text-shadow: 2px 2px 0px #ffd700;
  animation: iconBounce 3s ease-in-out infinite;
}

.placeholder-text {
  font-size: 1.4rem;
  text-align: center;
  text-shadow: 1px 1px 0px #ffd700;
  margin-bottom: 10px;
  font-weight: 600;
}

.placeholder-hint {
  font-size: 1.1rem;
  color: #cd853f;
  text-align: center;
  line-height: 1.5;
}

.preview-image {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 15px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
}

/* 原生消息提示容器 */
.native-message-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  max-width: 400px;
  pointer-events: none;
}

.native-message {
  background: linear-gradient(135deg, #fff8dc 0%, #fffacd 100%);
  border: 4px solid #f7a985;
  border-radius: 20px;
  padding: 15px 20px;
  margin-bottom: 15px;
  box-shadow: 
    0px 8px 16px rgba(255, 99, 71, 0.3),
    0px 4px 8px rgba(255, 140, 66, 0.2),
    inset 0px 2px 0px rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.4s cubic-bezier(.4, 2, .6, 1);
  cursor: pointer;
  pointer-events: auto;
  font-family: 'CuteFont64', 'Comic Sans MS', cursive;
  font-size: 1rem;
  color: #8b4513;
  text-shadow: 1px 1px 0px rgba(255, 255, 255, 0.5);
  letter-spacing: 0.5px;
  opacity: 0;
  transform: translateX(100%) scale(0.8);
  position: relative;
  overflow: hidden;
}

.native-message::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  transition: left 0.6s ease;
}

.native-message:hover::before {
  left: 100%;
}

.native-message:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 
    0px 12px 24px rgba(255, 99, 71, 0.4),
    0px 6px 12px rgba(255, 140, 66, 0.3),
    inset 0px 2px 0px rgba(255, 255, 255, 0.6);
}

.native-message--visible {
  opacity: 1;
  transform: translateX(0) scale(1);
}

.native-message__icon {
  font-size: 1.8rem;
  margin-right: 15px;
  filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.1));
  animation: iconBounce 2s ease-in-out infinite;
}

.native-message__content {
  flex-grow: 1;
  line-height: 1.4;
  text-align: left;
}

.native-message__close {
  cursor: pointer;
  font-size: 1.2rem;
  margin-left: 15px;
  font-weight: 800;
  opacity: 0.7;
  transition: all 0.2s ease;
  color: #8b4513;
  text-shadow: 1px 1px 0px rgba(255, 255, 255, 0.5);
  padding: 5px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
}

.native-message__close:hover {
  opacity: 1;
  background: rgba(255, 99, 71, 0.2);
  transform: scale(1.1);
}

/* 不同类型的消息样式 */
.native-message--success {
  border-color: #90ee90;
  background: linear-gradient(135deg, #f0fff0 0%, #e6ffe6 100%);
  color: #2e8b57;
}

.native-message--success .native-message__icon {
  color: #2e8b57;
  animation: successPulse 2s ease-in-out infinite;
}

@keyframes successPulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.native-message--error {
  border-color: #ff6b6b;
  background: linear-gradient(135deg, #ffe6e6 0%, #ffcccc 100%);
  color: #dc143c;
}

.native-message--error .native-message__icon {
  color: #dc143c;
  animation: errorShake 0.5s ease-in-out;
}

@keyframes errorShake {
  0%, 100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-3px);
  }
  75% {
    transform: translateX(3px);
  }
}

.native-message--warning {
  border-color: #ffa500;
  background: linear-gradient(135deg, #fffacd 0%, #fff8dc 100%);
  color: #b8860b;
}

.native-message--warning .native-message__icon {
  color: #ff8c00;
  animation: warningFlash 1s ease-in-out infinite;
}

@keyframes warningFlash {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}

.native-message--info {
  border-color: #87ceeb;
  background: linear-gradient(135deg, #f0f8ff 0%, #e6f3ff 100%);
  color: #4682b4;
}

.native-message--info .native-message__icon {
  color: #4682b4;
  animation: infoRotate 3s linear infinite;
}

@keyframes infoRotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
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
    gap: 18px;
    grid-template-columns: 0.8fr 1fr 0.8fr;
  }
}

@media (max-width: 1200px) {
  .main-content {
    grid-template-columns: 1fr 1fr;
    gap: 15px;
    max-width: 100%;
  }
  
  .upload-section {
    grid-column: 1;
    grid-row: 1;
  }
  
  .description-section {
    grid-column: 1 / span 2;
    grid-row: 2;
  }
  
  .output-section {
    grid-column: 2;
    grid-row: 1;
  }

  .comic-preview {
    min-height: 350px;
  }
  
  .description-textarea {
    min-height: 200px;
    max-height: 300px;
  }
}

@media (max-width: 768px) {
  .main-content {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  
  .upload-section,
  .description-section,
  .output-section {
    grid-column: 1;
    grid-row: auto;
  }

  .comic-preview {
    min-height: 280px;
  }
  
  .description-textarea {
    min-height: 180px;
    max-height: 250px;
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
  .ai-story {
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

  .section-title h2 {
    font-size: 1.5rem;
  }

  .upload-section,
  .description-section,
  .output-section {
    border-width: 4px;
    box-shadow: 0px 6px #ff6347;
    padding: 20px;
  }

  .upload-section .selfie-uploader :deep(.el-upload-dragger) {
    min-height: 200px;
  }

  .custom-select {
    font-size: 1rem;
    padding: 0.7em 0.9em;
    min-height: 42px;
  }

  .select-option {
    font-size: 1.2rem;
    padding: 14px 16px;
    min-height: 50px;
  }

  /* 描述区域移动端优化 */
  .description-controls {
    gap: 8px;
  }

  .description-controls .voice-input-btn {
    width: 35px;
    height: 35px;
    border-width: 2px;
  }

  .description-controls .voice-input-btn .el-icon {
    font-size: 1rem;
  }

  .clear-btn {
    font-size: 0.8rem;
    padding: 0.4em 0.8em;
    height: 30px;
  }

  .description-textarea {
    font-size: 0.9rem;
    padding: 0.8em 1em;
  }

  .word-count {
    font-size: 0.8rem;
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
    width: 300px;
    height: 300px;
  }

  .ray {
    height: 80px;
  }

  /* 移动端右上角按钮优化 */
  .output-corner-actions {
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
  .output-corner-actions {
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

  .comic-preview {
    height: 250px;
  }

  .placeholder-icon {
    font-size: 3rem;
    margin-bottom: 15px;
  }

  .placeholder-text {
    font-size: 1.2rem;
    margin-bottom: 8px;
  }

  .placeholder-hint {
    font-size: 1rem;
  }
}

/* 消息提示响应式 */
@media (max-width: 768px) {
  .native-message-container {
    top: 10px;
    right: 10px;
    left: 10px;
    max-width: none;
  }

  .native-message {
    padding: 12px 15px;
    font-size: 0.9rem;
    margin-bottom: 10px;
    border-width: 3px;
  }

  .native-message__icon {
    font-size: 1.5rem;
    margin-right: 10px;
  }

  .native-message__close {
    font-size: 1rem;
    width: 20px;
    height: 20px;
    min-width: 20px;
    margin-left: 10px;
  }
}

/* Element Plus 全局字体覆盖 */
:deep(.el-button) {
  letter-spacing: 0.5px;
}

:deep(.el-input__inner) {
  letter-spacing: 0.5px;
}

:deep(.el-textarea__inner) {
  line-height: 1.5;
}

:deep(.el-radio-button__inner) {
  letter-spacing: 0.5px;
}

:deep(.el-upload-dragger .el-upload__text) {
  font-size: 1.1rem;
  color: #8b4513;
}

:deep(.el-icon) {
  font-weight: 800;
}
</style>
