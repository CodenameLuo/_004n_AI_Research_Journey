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
            <span class="title-char" style="--delay: 0s">我</span>
            <span class="title-char" style="--delay: 0.1s">的</span>
            <span class="title-char" style="--delay: 0.2s">A</span>
            <span class="title-char" style="--delay: 0.3s">I</span>
            <span class="title-char" style="--delay: 0.3s">旅</span>
            <span class="title-char" style="--delay: 0.3s">记</span>
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
          <el-upload class="selfie-uploader" :show-file-list="false" :before-upload="handleSelfieUpload" accept=".jpg,.jpeg,.png" drag>
            <div v-if="!selfiePreview" class="upload-placeholder">
              <el-icon class="upload-icon">
                <Plus />
              </el-icon>
              <div class="upload-text">拖拽或点击上传自拍照</div>
              <div class="upload-hint">支持JPG、PNG格式</div>
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
          <h3>2. 上传8张地标图片</h3>
          <div class="upload-grid">
            <div v-for="(item, index) in descriptionImages" :key="index" class="upload-item">
              <div class="upload-number">{{ index + 1 }}</div>
              <el-upload class="description-uploader" :show-file-list="false" :before-upload="(file) => handleDescriptionUpload(file, index)" accept=".jpg,.jpeg,.png" drag>
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
          <el-button 
            type="primary" 
            size="large" 
            @click="generateImages" 
            :loading="isGenerating" 
            :disabled="!selfieImage || descriptionImages.filter(item => item.image).length !== 8"
            class="generate-btn"
          >
            <el-icon>
              <MagicStick />
            </el-icon>
            {{ isGenerating ? '正在生成中...' : '生成故事图片' }}
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
          <div 
            class="corner-button download-btn" 
            :class="{ 'disabled': !hasValidImages }"
            @click="showDownloadDialog" 
            :title="hasValidImages ? '批量下载' : '请先生成图片'"
          >
            <el-icon>
              <Download />
            </el-icon>
          </div>
        </div>
        
        <div class="preview-grid">
          <div v-for="(image, index) in generatedImages" :key="index" class="preview-item" 
               :draggable="canDrag && image" 
               @dragstart="handleDragStart(index, $event)"
               @dragend="handleDragEnd"
               @dragover.prevent
               @drop="handleDrop(index, $event)"
               :class="{ 'dragging': draggedIndex === index, 'drag-over': dragOverIndex === index, 'draggable': canDrag && image }">
            <!-- 已生成的图片 - 最高优先级 -->
            <div class="preview-image" v-if="image">
              <img :src="image" :alt="`生成图片${index + 1}`" @load="onImageLoad(index)" @error="onImageError(index)" />
              <div class="image-actions">
                <el-button size="small" @click="downloadImage(image, index)">
                  <el-icon>
                    <Download />
                  </el-icon>
                </el-button>
                <el-button size="small" type="warning" @click="regenerateSingleImage(index)" :loading="imageStatus[index] && imageStatus[index].includes('重新生成')">
                  <el-icon>
                    <Refresh />
                  </el-icon>
                </el-button>
                
              </div>
            </div>
            <!-- 生成失败显示 -->
            <div class="generating-failed" v-else-if="imageStatus[index] && imageStatus[index].includes('失败')">
              <div class="failed-icon">❌</div>
              <div class="failed-text">{{ imageStatus[index] }}</div>
              <div class="failed-actions">
                <el-button size="small" type="warning" @click="regenerateSingleImage(index)" :loading="imageStatus[index] && imageStatus[index].includes('重新生成')">
                  <el-icon>
                    <Refresh />
                  </el-icon>
                  重新生成
                </el-button>
              </div>
            </div>
            <!-- 预处理/排队阶段 - 旋转加载圆圈 -->
            <div class="generating-loading" v-else-if="imageStatus[index] && (imageStatus[index].includes('预处理') || imageStatus[index].includes('排队') || imageStatus[index].includes('处理中'))">
              <div class="loading-container">
                <div class="loading-spinner"></div>
                <div class="loading-status">{{ imageStatus[index] }}</div>
                <div class="loading-actions">
                  <el-button size="small" type="warning" @click="regenerateSingleImage(index)" :loading="imageStatus[index] && imageStatus[index].includes('重新生成')">
                    <el-icon>
                      <Refresh />
                    </el-icon>
                    重新生成
                  </el-button>
                </div>
              </div>
            </div>
            <!-- 生成阶段 - 进度条显示 -->
            <div class="generating-progress" v-else-if="imageStatus[index] && imageStatus[index].includes('生成')">
              <div class="progress-container">
                <div class="progress-circle">
                  <svg class="progress-ring" width="120" height="120">
                    <circle
                      class="progress-ring-circle"
                      stroke="#ff8c42"
                      stroke-width="8"
                      fill="transparent"
                      r="52"
                      cx="60"
                      cy="60"
                      :stroke-dasharray="`${2 * Math.PI * 52}`"
                      :stroke-dashoffset="`${2 * Math.PI * 52 * (1 - Math.max(imageProgress[index], 0) / 100)}`"
                      style="--mobile-radius: 42"
                    />
                  </svg>
                  <div class="progress-text">{{ Math.round(Math.max(imageProgress[index], 0)) }}%</div>
                </div>
                <div class="progress-status">{{ imageStatus[index] || '生成中...' }}</div>
                <div class="progress-actions">
                  <el-button size="small" type="warning" @click="regenerateSingleImage(index)" :loading="imageStatus[index] && imageStatus[index].includes('重新生成')">
                    <el-icon>
                      <Refresh />
                    </el-icon>
                    重新生成
                  </el-button>
                </div>
              </div>
            </div>
            <!-- 其他状态 - 旋转加载圆圈 -->
            <div class="generating-loading" v-else-if="imageStatus[index]">
              <div class="loading-container">
                <div class="loading-spinner"></div>
                <div class="loading-status">{{ imageStatus[index] }}</div>
                <div class="loading-actions">
                  <el-button size="small" type="warning" @click="regenerateSingleImage(index)" :loading="imageStatus[index] && imageStatus[index].includes('重新生成')">
                    <el-icon>
                      <Refresh />
                    </el-icon>
                    重新生成
                  </el-button>
                </div>
              </div>
            </div>
            <!-- 等待生成 -->
            <div class="preview-placeholder" v-else>
              <el-icon class="placeholder-icon">
                <Picture />
              </el-icon>
              <div class="placeholder-text">等待生成...</div>
            </div>
            <div class="preview-label">
              {{ index === 0 ? '封面' : index }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 下载选择弹窗 -->
    <div v-if="showDownloadModal" class="download-modal-overlay" @click="closeDownloadModal">
      <div class="download-modal" @click.stop>
        <div class="modal-header">
          <h3>🎯 选择下载方式</h3>
          <div class="modal-close" @click="closeDownloadModal">✕</div>
        </div>
        <div class="modal-content">
          <div class="download-options">
            <div class="download-option" @click="downloadAllImages">
              <div class="option-icon">📁</div>
              <div class="option-content">
                <div class="option-title">单张全部下载</div>
                <div class="option-desc">分别下载每张图片</div>
              </div>
            </div>
            <div class="download-option" @click="downloadGridImage">
              <div class="option-icon">🔲</div>
              <div class="option-content">
                <div class="option-title">拼接九宫格下载</div>
                <div class="option-desc">将9张图片拼接为一张九宫格</div>
              </div>
            </div>
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
import { ref, reactive, onMounted, onUnmounted, computed } from 'vue'
import { Plus, Delete, Picture, MagicStick, Download, Microphone, Refresh } from '@element-plus/icons-vue'
// 移除画廊组件引用
import styleTemplateData from '../assets/style_template.json'

// API配置 - 改为使用与StyleTransfer相同的API
const API_KEY = 'sk-JdJqP2CyAUXtqGL36d25AaDa6e9b46868bF45d0a515d7882'

// 响应式数据
const userInfo = reactive({
  name: '',
  gender: '',
  style: '',
  descriptions: Array(8).fill('') // 8个描述，但不在前端显示
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

// 每个图片的生成进度和状态
const imageProgress = ref(Array(9).fill(0))
const imageStatus = ref(Array(9).fill(''))

// 生成状态
const isGenerating = ref(false)

// 语音识别相关状态
const recordingIndex = ref(-1)
const recognition = ref(null)
const isRecognitionSupported = ref(false)
const isRecognitionActive = ref(false)

// 自定义下拉菜单状态
const isStyleSelectOpen = ref(false)

// 下载弹窗状态
const showDownloadModal = ref(false)

// 拖拽相关状态
const draggedIndex = ref(-1)
const dragOverIndex = ref(-1)

// 计算是否有有效的图片
const hasValidImages = computed(() => {
  return generatedImages.value.some(url => url)
})

// 计算是否可以拖拽
const canDrag = computed(() => {
  return generatedImages.value.filter(url => url).length > 1
})

// 风格选项 - 从style_template.json加载
const styleOptions = styleTemplateData.map(style => ({
  label: style.name,
  value: style.name
}))

// 当前会话ID
const sessionId = ref('')

// 原生消息提示系统
const messages = ref([])
let messageId = 0

// 翻译缓存
const translationCache = new Map()

// 从style_template.json获取风格配置
const getStyleTemplate = (styleName) => {
  return styleTemplateData.find(template => template.name === styleName) || {
    name: styleName,
    prompt: "{prompt}",
    negative_prompt: ""
  }
}

// 将图片压缩到最长边 768px，并导出为 0.7 质量 JPEG
const compressImage = (file) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      const maxSide = 768
      let { width, height } = img
      if (width > height && width > maxSide) {
        height = (maxSide / width) * height
        width = maxSide
      } else if (height > maxSide) {
        width = (maxSide / height) * width
        height = maxSide
      }
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, width, height)
      // 质量 0.7 可自行调整
      const dataUrl = canvas.toDataURL('image/jpeg', 0.7)
      resolve({ base64: dataUrl, width, height })
    }
    img.onerror = reject
    // File → blob → objectURL 避免 FileReader 额外内存
    img.src = URL.createObjectURL(file)
  })
}

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

// 图片加载成功回调
const onImageLoad = (index) => {
  console.log(`图片 ${index + 1} 加载成功`)
  imageStatus.value[index] = '完成'
  imageProgress.value[index] = 100
}

// 图片加载错误回调
const onImageError = (index) => {
  console.error(`图片 ${index + 1} 加载失败`)
  imageStatus.value[index] = '图片加载失败'
  // 清除失效的图片URL
  generatedImages.value[index] = null
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
  return false // 阻止自动上传
}

const handleDescriptionUpload = (file, index) => {
  if (!validateImage(file)) return false
  descriptionImages.value[index].image = file
  const reader = new FileReader()
  reader.onload = (e) => {
    descriptionImages.value[index].preview = e.target.result
  }
  reader.readAsDataURL(file)
  return false
}

// 图片验证
const validateImage = (file) => {
  const isJPG = file.type === 'image/jpeg' || file.type === 'image/jpg'
  const isPNG = file.type === 'image/png'
  if (!isJPG && !isPNG) {
    NativeMessage.error('请上传JPG或PNG格式的图片！')
    return false
  }
  // 移除大小限制，允许任意大小的图片
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

// 生成单个图片的函数
const generateSingleImage = async (imageIndex, promptText, selfieBase64, descriptionBase64 = null) => {
  // 如果状态还未设置，则设置为预处理中（避免重复设置）
  if (!imageStatus.value[imageIndex] || imageStatus.value[imageIndex] === '预处理中...') {
    imageProgress.value[imageIndex] = 0
    imageStatus.value[imageIndex] = '预处理中...'
  }
  
  const styleTemplate = getStyleTemplate(userInfo.style)
  
  let finalPrompt
  if (imageIndex === 0) {
    // 第一张图片：纯自拍照风格转换
    finalPrompt = styleTemplate.prompt.replace('{prompt}', `a portrait of a ${userInfo.gender === 'male' ? 'boy' : 'girl'} named ${userInfo.name}`)
  } else {
    // 后面八张图片：人物场景结合
    finalPrompt = styleTemplate.prompt.replace('{prompt}', 
      `${promptText}, featuring a ${userInfo.gender === 'male' ? 'boy' : 'girl'} named ${userInfo.name} in the scene`
    )
  }
  
  // 在所有prompt后添加正方形比例要求
  finalPrompt = `${finalPrompt}. IMPORTANT: Generate as a perfect square image with 1:1 aspect ratio. The image dimensions should be equal width and height (square format), not rectangular.`

  const body = {
    model: 'gpt-4o-image',
    stream: true,
    messages: [
      {
        role: 'user',
        content: [
          { type: 'text', text: finalPrompt },
          { type: 'image_url', image_url: { url: selfieBase64 } },
          ...(descriptionBase64 ? [{ type: 'image_url', image_url: { url: descriptionBase64 } }] : [])
        ],
      },
    ],
    // 添加图片生成参数，确保正方形比例
    max_tokens: 4000,
    temperature: 0.7,
    // 如果API支持size参数，指定正方形尺寸
    ...(typeof window !== 'undefined' && {
      size: "1024x1024"  // 常见的正方形尺寸
    })
  }

  const res = await fetch(`https://api.lingximoyu.com/v1/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(body),
  })

  if (!res.ok || !res.body) {
    const txt = await res.text()
    throw new Error(txt || '接口请求失败')
  }

  const reader = res.body.getReader()
  const decoder = new TextDecoder('utf-8')
  let accumulated = ''
  let chunkCount = 0

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    
    const chunk = decoder.decode(value, { stream: true })
    const lines = chunk.split('\n')
    
    for (const line of lines) {
      if (!line.startsWith('data:')) continue
      const payload = line.replace(/^data:\s*/, '')
      if (payload === '[DONE]') {
        imageProgress.value[imageIndex] = 100
        // 如果还没有获取到图片URL，不要设置为完成状态
        if (!generatedImages.value[imageIndex]) {
          imageStatus.value[imageIndex] = '处理中...'
        }
        return
      }
      
      try {
        const json = JSON.parse(payload)
        const contentDelta = json.choices?.[0]?.delta?.content || ''
        accumulated += contentDelta

        // 队列/预处理提示
        if (contentDelta.includes('任务正在队列中')) {
          imageStatus.value[imageIndex] = '排队中...'
          imageProgress.value[imageIndex] = 0
        }

        // 检查进度百分比
        const pctMatch = contentDelta.match(/进度：([\d.]+)%/)
        if (pctMatch) {
          imageStatus.value[imageIndex] = '生成中...'
          imageProgress.value[imageIndex] = Math.min(99, parseFloat(pctMatch[1]))
        }

        if (contentDelta.includes('图片绘制成功')) {
          imageStatus.value[imageIndex] = '生成成功'
        }

        // Fallback：仍然用 chunk 数来估算，避免长时间0%
        if (!pctMatch && !contentDelta.includes('任务正在队列中')) {
          chunkCount++
          // 如果没有明确的进度信息，且不在排队中，慢慢增加进度
          if (chunkCount % 10 === 0 && imageProgress.value[imageIndex] < 90) {
            if (imageStatus.value[imageIndex] === '预处理中...') {
              imageStatus.value[imageIndex] = '生成中...'
            }
            imageProgress.value[imageIndex] += 1
          }
          
          // 添加超时处理，避免无限等待
          if (chunkCount > 300) { // 大约30秒后超时
            throw new Error('生成超时，请重试')
          }
        }

        // 尝试多种URL匹配模式
        const urlPatterns = [
          /https?:\/\/[^\s\])+]+/g,  // 标准URL模式
          /https?:[^\s)]+/g,         // 原有的模式
          /"(https?:\/\/[^"]+)"/g,   // 引号包围的URL
          /\[(https?:\/\/[^\]]+)\]/g // 方括号包围的URL
        ]
        
        for (const pattern of urlPatterns) {
          const matches = accumulated.match(pattern)
          if (matches && matches.length > 0) {
            const imageUrl = matches[matches.length - 1].replace(/["\]]+$/, '') // 清理结尾的引号或括号
            console.log(`图片 ${imageIndex + 1} 获取到URL (模式: ${pattern}):`, imageUrl)
            
            // 验证URL是否为有效的图片URL
            if (imageUrl.match(/\.(jpg|jpeg|png|gif|webp)(\?|$)/i) || imageUrl.includes('image') || imageUrl.includes('picture')) {
              generatedImages.value[imageIndex] = imageUrl
              imageProgress.value[imageIndex] = 100
              imageStatus.value[imageIndex] = '图片已获取'
              return
            }
          }
        }
      } catch (e) {
        console.warn('解析流数据失败', e)
      }
    }
  }
}

// 生成图片
const generateImages = async () => {
  // 验证输入
  if (!selfieImage.value) {
    NativeMessage.warning('请先上传自拍照！')
    return
  }
  if (!userInfo.name.trim()) {
    NativeMessage.warning('请输入姓名！')
    return
  }
  if (!userInfo.gender) {
    NativeMessage.warning('请选择性别！')
    return
  }
  if (!userInfo.style) {
    NativeMessage.warning('请选择图片风格！')
    return
  }
  
  // 检查是否上传了所有图片
  const uploadedImages = descriptionImages.value.filter(item => item.image !== null)
  if (uploadedImages.length !== 8) {
    NativeMessage.warning('请上传所有8张参考图片！')
    return
  }
  
  isGenerating.value = true
  
  // 重置进度和状态
  imageProgress.value = Array(9).fill(0)
  imageStatus.value = Array(9).fill('')
  generatedImages.value = Array(9).fill(null)
  
  try {
    NativeMessage.info('正在压缩图片...')
    
    // 1. 压缩自拍照
    const { base64: selfieBase64 } = await compressImage(selfieImage.value)
    
    // 2. 压缩描述图片
    const descriptionBase64List = []
    for (let i = 0; i < descriptionImages.value.length; i++) {
      if (descriptionImages.value[i].image) {
        const { base64 } = await compressImage(descriptionImages.value[i].image)
        descriptionBase64List.push(base64)
      }
    }
    
    // 3. 使用固定的描述："将人物与地标点融合"
    const fixedDescription = "将人物与地标点融合"
    const fixedDescriptions = Array(8).fill(fixedDescription)
    
    NativeMessage.success('开始并发生成9张图片...')
    
    // 4. 立即显示所有图片都在预处理中
    for (let i = 0; i < 9; i++) {
      imageProgress.value[i] = 0
      imageStatus.value[i] = '预处理中...'
    }
    
    // 5. 并发生成所有图片
    const generationPromises = []
    
    // 第一张图片：纯自拍照风格转换
    generationPromises.push(
      generateSingleImage(0, '', selfieBase64, null).catch(error => {
        console.error(`生成第1张图片失败:`, error)
        imageStatus.value[0] = '生成失败'
        NativeMessage.error(`第1张图片生成失败: ${error.message}`)
      })
    )
    
    // 后面八张图片：人物场景结合
    for (let i = 0; i < 8; i++) {
      const imageIndex = i + 1
      const description = fixedDescriptions[i]
      const descBase64 = descriptionBase64List[i]
      
      generationPromises.push(
        generateSingleImage(imageIndex, description, selfieBase64, descBase64).catch(error => {
          console.error(`生成第${imageIndex + 1}张图片失败:`, error)
          imageStatus.value[imageIndex] = '生成失败'
          NativeMessage.error(`第${imageIndex + 1}张图片生成失败: ${error.message}`)
        })
      )
    }
    
    // 等待所有图片生成完成
    await Promise.allSettled(generationPromises)
    
    // 检查成功生成的图片数量
    const successCount = generatedImages.value.filter(img => img).length
    if (successCount > 0) {
      NativeMessage.success(`成功生成${successCount}张图片！`)
    } else {
      NativeMessage.error('所有图片生成都失败了，请重试！')
    }
    
  } catch (error) {
    console.error('生成错误:', error)
    NativeMessage.error(error.message || '生成失败，请重试！')
    // 重置生成状态
    generatedImages.value = Array(9).fill(null)
    imageProgress.value = Array(9).fill(0)
    imageStatus.value = Array(9).fill('')
  } finally {
    isGenerating.value = false
  }
}

// 下载功能
const downloadImage = (url, index) => {
  // 如果是base64图片，直接下载
  if (url.startsWith('data:image')) {
  const link = document.createElement('a')
  link.href = url
    link.download = `${userInfo.name || '故事'}_${index === 0 ? '封面' : index}.png`
  link.click()
  } else {
    // 如果是URL，获取后下载
    fetch(url)
      .then(response => response.blob())
      .then(blob => {
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = `${userInfo.name || '故事'}_${index === 0 ? '封面' : index}.png`
        link.click()
        URL.revokeObjectURL(link.href)
      })
      .catch(error => {
        console.error('下载失败:', error)
        NativeMessage.error('下载失败！')
      })
  }
}

// 显示下载弹窗
const showDownloadDialog = () => {
  if (!hasValidImages.value) {
    NativeMessage.warning('请先生成图片再进行下载！')
    return
  }
  showDownloadModal.value = true
}

// 关闭下载弹窗
const closeDownloadModal = () => {
  showDownloadModal.value = false
}

// 单张全部下载
const downloadAllImages = () => {
  const validImages = generatedImages.value.filter(url => url)
  if (validImages.length === 0) {
    NativeMessage.warning('没有可下载的图片！')
    return
  }
  
  NativeMessage.info(`开始下载${validImages.length}张图片...`)
  generatedImages.value.forEach((url, index) => {
    if (url) {
      // 延迟下载，避免浏览器阻止多文件下载
      setTimeout(() => downloadImage(url, index), index * 100)
    }
  })
  closeDownloadModal()
}

// 拼接九宫格下载
const downloadGridImage = async () => {
  const validImages = generatedImages.value.filter(url => url)
  if (validImages.length === 0) {
    NativeMessage.warning('没有可下载的图片！')
    return
  }
  
  try {
    NativeMessage.info('正在生成九宫格图片，请稍候...')
    
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    
    // 设置画布大小 (3x3 网格)
    const gridSize = 3
    const imageSize = 400 // 每个图片的大小
    canvas.width = gridSize * imageSize
    canvas.height = gridSize * imageSize
    
    // 填充背景色
    ctx.fillStyle = '#fff8dc'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // 加载所有图片
    const loadImage = (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.crossOrigin = 'anonymous'
        img.onload = () => resolve(img)
        img.onerror = reject
        img.src = src
      })
    }
    
    const imagePromises = generatedImages.value.map(async (url, index) => {
      if (url) {
        try {
          const img = await loadImage(url)
          return { img, index }
        } catch (error) {
          console.warn(`加载图片 ${index + 1} 失败:`, error)
          return null
        }
      }
      return null
    })
    
    const results = await Promise.allSettled(imagePromises)
    
         // 绘制图片到画布
     results.forEach((result, index) => {
       if (result.status === 'fulfilled' && result.value) {
         const { img } = result.value
         const row = Math.floor(index / gridSize)
         const col = index % gridSize
         
         // 计算位置
         const x = col * imageSize
         const y = row * imageSize
         
         // 绘制图片
         ctx.drawImage(img, x, y, imageSize, imageSize)
         
         // 添加边框
         ctx.strokeStyle = '#f7a985'
         ctx.lineWidth = 4
         ctx.strokeRect(x, y, imageSize, imageSize)
       }
     })
    
    // 转换为图片并下载
    canvas.toBlob((blob) => {
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = `${userInfo.name || '故事'}_九宫格.png`
      link.click()
      URL.revokeObjectURL(link.href)
      
      NativeMessage.success('九宫格图片已生成并下载！')
    }, 'image/png')
    
  } catch (error) {
    console.error('生成九宫格失败:', error)
    NativeMessage.error('生成九宫格失败，请重试！')
  } finally {
    closeDownloadModal()
  }
}

// 拖拽功能
const handleDragStart = (index, event) => {
  if (!canDrag.value || !generatedImages.value[index]) return
  
  draggedIndex.value = index
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('text/plain', index.toString())
}

const handleDragEnd = () => {
  draggedIndex.value = -1
  dragOverIndex.value = -1
}

const handleDrop = (targetIndex, event) => {
  event.preventDefault()
  
  const sourceIndex = parseInt(event.dataTransfer.getData('text/plain'))
  
  if (sourceIndex === targetIndex || !generatedImages.value[sourceIndex] || !generatedImages.value[targetIndex]) {
    return
  }
  
  // 交换图片位置
  const temp = generatedImages.value[sourceIndex]
  generatedImages.value[sourceIndex] = generatedImages.value[targetIndex]
  generatedImages.value[targetIndex] = temp
  
  // 交换状态
  const tempStatus = imageStatus.value[sourceIndex]
  imageStatus.value[sourceIndex] = imageStatus.value[targetIndex]
  imageStatus.value[targetIndex] = tempStatus
  
  const tempProgress = imageProgress.value[sourceIndex]
  imageProgress.value[sourceIndex] = imageProgress.value[targetIndex]
  imageProgress.value[targetIndex] = tempProgress
  
  draggedIndex.value = -1
  dragOverIndex.value = -1
  
  NativeMessage.success('图片位置已交换！')
}

// 自定义下拉菜单方法
const toggleStyleSelect = () => {
  isStyleSelectOpen.value = !isStyleSelectOpen.value
}

const selectStyle = (value) => {
  userInfo.style = value
  isStyleSelectOpen.value = false
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

// 组件挂载
onMounted(async () => {
  document.addEventListener('click', handleClickOutside)
})

// 组件卸载时清理事件监听
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// 重新生成单个图片
const regenerateSingleImage = async (index) => {
  // 验证输入
  if (!selfieImage.value) {
    NativeMessage.error('请先上传自拍照！')
    return
  }
  if (!userInfo.name.trim()) {
    NativeMessage.warning('请输入姓名！')
    return
  }
  if (!userInfo.gender) {
    NativeMessage.warning('请选择性别！')
    return
  }
  if (!userInfo.style) {
    NativeMessage.warning('请选择图片风格！')
    return
  }

  // 如果当前正在生成中，先中断
  if (imageStatus.value[index] && 
      (imageStatus.value[index].includes('生成中') || 
       imageStatus.value[index].includes('预处理') || 
       imageStatus.value[index].includes('排队'))) {
    imageStatus.value[index] = '已中断'
    NativeMessage.info(`已中断第${index + 1}张图片的生成`)
  }

  // 重置进度和状态
  imageProgress.value[index] = 0
  imageStatus.value[index] = '重新生成中...'
  generatedImages.value[index] = null

  try {
    NativeMessage.info(`正在重新生成第${index + 1}张图片...`)

    // 1. 压缩自拍照
    const { base64: selfieBase64 } = await compressImage(selfieImage.value)

    // 2. 准备描述图片（如果是第一张图片，不需要描述图片）
    let descriptionBase64 = null
    let promptText = ''
    
    if (index === 0) {
      // 第一张图片：纯自拍照风格转换
      promptText = ''
      descriptionBase64 = null
    } else {
      // 后面八张图片：人物场景结合
      const descriptionIndex = index - 1
      if (descriptionImages.value[descriptionIndex]?.image) {
        const { base64 } = await compressImage(descriptionImages.value[descriptionIndex].image)
        descriptionBase64 = base64
        promptText = "将人物与地标点融合"
      } else {
        NativeMessage.error(`缺少第${descriptionIndex + 1}张描述图片！`)
        imageStatus.value[index] = '缺少描述图片'
        return
      }
    }

    // 3. 生成单个图片
    await generateSingleImage(index, promptText, selfieBase64, descriptionBase64)

    NativeMessage.success(`第${index + 1}张图片重新生成成功！`)
  } catch (error) {
    console.error(`重新生成第${index + 1}张图片失败:`, error)
    NativeMessage.error(`第${index + 1}张图片重新生成失败: ${error.message}`)
    imageStatus.value[index] = '重新生成失败'
  }
}

// 删除单个图片
const deleteSingleImage = (index) => {
  if (generatedImages.value[index]) {
    generatedImages.value[index] = null
    imageProgress.value[index] = 0
    imageStatus.value[index] = ''
    NativeMessage.success(`已删除第${index + 1}张图片`)
  }
}
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
}

.image-preview.small img {
  max-height: 120px;
}

.image-overlay {
  position: absolute;
  top: 5px;
  right: 5px;
  opacity: 1;
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
  /* height: fit-content; */
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
  
  color: #8b4513;
  font-size: 1.2rem;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.preview-status {
  font-size: 0.7rem;
  font-weight: 600;
  opacity: 0.9;
  text-align: center;
  line-height: 1.2;
  max-width: 60px;
  word-break: break-word;
}

.preview-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #8b4513;
  
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
  
}

/* 加载状态显示样式 */
.generating-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #8b4513;
  
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.loading-spinner {
  width: 80px;
  height: 80px;
  border: 8px solid rgba(255, 140, 66, 0.2);
  border-top: 8px solid #ff8c42;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  filter: drop-shadow(0 0 8px rgba(255, 140, 66, 0.4));
}

.loading-status {
  font-size: 1rem;
  color: #8b4513;
  text-align: center;
  text-shadow: 1px 1px 0px #ffd700;
  
  letter-spacing: 0.5px;
  animation: loadingPulse 1.5s ease-in-out infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes loadingPulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.02);
  }
}

/* 生成进度显示样式 */
.generating-progress {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #8b4513;
  
}

.progress-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.progress-circle {
  position: relative;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.progress-ring {
  transform: rotate(-90deg);
  position: absolute;
  top: 0;
  left: 0;
}

.progress-ring-circle {
  transition: stroke-dashoffset 0.3s ease;
  stroke-linecap: round;
  filter: drop-shadow(0 0 8px rgba(255, 140, 66, 0.4));
}

.progress-text {
  font-size: 1.4rem;
  font-weight: 800;
  color: #ff8c42;
  text-shadow: 1px 1px 0px #ffd700;
  animation: progressPulse 2s ease-in-out infinite;
}

.progress-status {
  font-size: 1rem;
  color: #8b4513;
  text-align: center;
  text-shadow: 1px 1px 0px #ffd700;
  
  letter-spacing: 0.5px;
  animation: statusBlink 1.5s ease-in-out infinite;
}

/* 失败状态样式 */
.progress-status:has-text("失败") {
  color: #dc143c;
  text-shadow: 1px 1px 0px rgba(220, 20, 60, 0.3);
  animation: none;
}

/* 重新生成按钮样式 */
.failed-actions,
.loading-actions,
.progress-actions {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}

.failed-actions .el-button,
.loading-actions .el-button,
.progress-actions .el-button {
  font-size: 0.8rem;
  color: #fff;
  background-color: #ff8c42;
  padding: 0.3em 0.6em;
  border-radius: 15px;
  border: 2px solid #f7a985;
  box-shadow: 0px 2px #f32b11;
  transition: all 0.1s ease;
  letter-spacing: 0.3px;
}

.failed-actions .el-button:hover,
.loading-actions .el-button:hover,
.progress-actions .el-button:hover {
  background-color: #ff6347;
  transform: translateY(-1px);
  box-shadow: 0px 3px #f32b11;
}

.failed-actions .el-button:active,
.loading-actions .el-button:active,
.progress-actions .el-button:active {
  position: relative;
  top: 2px;
  border: 2px solid #ffb764;
  box-shadow: 0px 0px;
}

/* 图片操作区域的重新生成按钮 */
.image-actions .el-button[type="warning"] {
  background-color: #ff8c42;
  color: #fff;
  border-color: #f7a985;
}

.image-actions .el-button[type="warning"]:hover {
  background-color: #ff6347;
  transform: translateY(-1px);
  box-shadow: 0px 3px #f32b11;
}

.image-actions .el-button[type="warning"]:active {
  position: relative;
  top: 2px;
  border: 2px solid #ffb764;
  box-shadow: 0px 0px;
}

/* 图片操作区域的删除按钮 */
.image-actions .el-button[type="danger"] {
  background-color: #ff6347;
  color: #fff;
  border-color: #f7a985;
}

.image-actions .el-button[type="danger"]:hover {
  background-color: #dc143c;
  transform: translateY(-1px);
  box-shadow: 0px 3px #8b0000;
}

.image-actions .el-button[type="danger"]:active {
  position: relative;
  top: 2px;
  border: 2px solid #cd5c5c;
  box-shadow: 0px 0px;
}

/* 生成失败显示 */
.generating-failed {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #dc143c;
  
}

.failed-icon {
  font-size: 3rem;
  margin-bottom: 10px;
  color: #dc143c;
  animation: shake 0.5s ease-in-out;
}

.failed-text {
  font-size: 1.1rem;
  text-align: center;
  text-shadow: 1px 1px 0px rgba(220, 20, 60, 0.3);
  
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

@keyframes progressPulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.9;
  }
}

@keyframes statusBlink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
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
  top: 8px;
  right: 8px;
  display: flex;
  gap: 5px;
  opacity: 1;
  transition: all 0.3s ease;
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
.form-item :deep(.el-radio-button__inner), .form-item-row :deep(.el-radio-button__inner) {
  background: #fff8dc;
  color: #8b4513;
  border: 4px solid #f7a985;
  border-radius: 20px;
  
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
  
  font-size: 1.1rem;
}



/* 图片相关立体样式 */
.image-preview img {
  max-width: 100%;
  max-height: 150%;
  border-radius: 10px;
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

  /* 移动端下拉菜单优化 */
  .cartoon-select {
    font-size: 1rem;
    padding: 0.7em 0.9em;
    background-size: 1.1em;
    padding-right: 2.3em;
  }

  .cartoon-select option {
    font-size: 1.2rem;
    padding: 14px 16px;
    min-height: 50px;
  }

  /* 移动端自定义下拉菜单优化 */
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
  border-color: #ff8c42;
  box-shadow: 0 0 0 4px rgba(255, 179, 71, 0.4), 0 4px 12px rgba(255, 215, 0, 0.6);
  outline: none;
  background-color: #fff8dc;
  transform: translateY(-1px);
}

.cartoon-select:hover {
  background-color: #fff8dc;
  border-color: #ffb347;
  transform: translateY(-2px);
  box-shadow: 
    inset 0px 2px 4px rgba(0, 0, 0, 0.1), 
    0px 6px 12px rgba(255, 140, 66, 0.3),
    0px 2px 6px rgba(255, 215, 0, 0.4);
}

/* 优化下拉菜单选项样式 - 提高可用性和协调性 */
.cartoon-select option {
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
}

.cartoon-select option:hover {
  background: #ffb347 !important;
  background-color: #ffb347 !important;
  color: #fff !important;
  font-weight: 800;
  text-shadow: 1px 1px 2px rgba(139, 69, 19, 0.5);
}

.cartoon-select option:checked,
.cartoon-select option:selected {
  background: #ff8c42 !important;
  background-color: #ff8c42 !important;
  color: #fff !important;
  font-weight: 800;
  text-shadow: 1px 1px 2px rgba(139, 69, 19, 0.5);
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
}

.cartoon-select option:focus {
  background: #ffb347 !important;
  background-color: #ffb347 !important;
  color: #fff !important;
  outline: 2px solid #ffd700;
  outline-offset: -2px;
}

/* 强制覆盖浏览器默认样式 */
.cartoon-select option:hover,
.cartoon-select option:focus,
.cartoon-select option:active {
  background: #ffb347 !important;
  background-color: #ffb347 !important;
  color: #fff !important;
}

.cartoon-select option:checked:hover,
.cartoon-select option:selected:hover {
  background: #ff8c42 !important;
  background-color: #ff8c42 !important;
  color: #fff !important;
}

.cartoon-select option:disabled {
  background: #f5f5dc !important;
  background-color: #f5f5dc !important;
  color: #cd853f !important;
  cursor: not-allowed;
  opacity: 0.6;
}

/* 额外的强制样式覆盖 - 针对不同浏览器 */
.cartoon-select option {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.cartoon-select option:hover,
.cartoon-select option:focus-visible,
.cartoon-select option:focus {
  background: #ffb347 !important;
  background-color: #ffb347 !important;
  color: #fff !important;
  border: none !important;
  outline: none !important;
}

/* 针对 WebKit 浏览器的特殊处理 */
@supports (-webkit-appearance: none) {
  .cartoon-select option:hover {
    background: #ffb347 !important;
    background-color: #ffb347 !important;
    color: #fff !important;
  }
}

/* 针对 Firefox 的特殊处理 */
@-moz-document url-prefix() {
  .cartoon-select option:hover {
    background: #ffb347 !important;
    background-color: #ffb347 !important;
    color: #fff !important;
  }
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

/* 自定义滚动条样式 */
.select-options::-webkit-scrollbar {
  width: 8px;
}

.select-options::-webkit-scrollbar-track {
  background: rgba(255, 215, 0, 0.2);
  border-radius: 4px;
}

.select-options::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #ff8c42, #ffb347);
  border-radius: 4px;
  border: 1px solid #f7a985;
}

.select-options::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #ffb347, #ffd700);
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
  font-size: 1rem;
  box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.1);
  padding: 0.2em 0.2em;
  width: 100%;
  transition: all 0.2s ease;
  letter-spacing: 0.5px;
  line-height: 1.5;
  resize: none;
  min-height: 3.2em;
  max-height: 6em; 
  height: auto;
  overflow-y: auto;
}

.cartoon-textarea:focus {
  border-color: #ffb347;
  box-shadow: 0 0 0 4px #ffe4b5, 0 2px 6px #ffd700;
  outline: none;
  background: #fff8dc;
}

.cartoon-textarea::placeholder {
  color: #cd853f;
  
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

/* 生成提示样式 */
.generate-hint {
  margin-top: 15px;
  padding: 15px;
  background: rgba(255, 215, 0, 0.1);
  border: 3px solid #ffd700;
  border-radius: 15px;
  font-size: 0.95rem;
}

.generate-hint p {
  margin: 0 0 10px 0;
  
  color: #8b4513;
  text-align: center;
}

.generate-hint ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.generate-hint li {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 0;
  color: #8b4513;
  
  transition: all 0.3s ease;
}

.generate-hint li.completed {
  color: #2e8b57;
  
}

.generate-hint .check-icon {
  font-size: 1.1rem;
  min-width: 1.5em;
  text-align: center;
}

/* 禁用状态的生成按钮 */
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

/* 禁用状态的批量操作按钮样式 */
.corner-button.disabled {
  background: linear-gradient(135deg, #cccccc, #999999) !important;
  color: #666666 !important;
  cursor: not-allowed !important;
  opacity: 0.6;
  border-color: #bbbbbb !important;
  box-shadow: 
    0px 3px 6px rgba(0, 0, 0, 0.1),
    inset 0px 1px 0px rgba(255, 255, 255, 0.2) !important;
  transform: none !important;
  pointer-events: none;
}

.corner-button.disabled::before {
  display: none !important;
}

.corner-button.disabled:hover {
  background: linear-gradient(135deg, #cccccc, #999999) !important;
  transform: none !important;
  box-shadow: 
    0px 3px 6px rgba(0, 0, 0, 0.1),
    inset 0px 1px 0px rgba(255, 255, 255, 0.2) !important;
}

.corner-button.disabled .el-icon {
  color: #666666 !important;
  filter: none !important;
  text-shadow: none !important;
}

/* 画廊区域 */
.gallery-section {
  margin-top: 20px;
}

.gallery-title {
  font-size: 1.8rem;
  font-weight: 800;
  color: #8b4513;
  margin-bottom: 15px;
  text-shadow: 2px 2px 0px #ffd700;
  letter-spacing: 1px;
  animation: titleGlow 3s ease-in-out infinite;
}

@keyframes titleGlow {
  0%, 100% {
    text-shadow: 2px 2px 0px #ffd700;
  }
  50% {
    text-shadow: 2px 2px 0px #ffd700, 0 0 15px rgba(255, 215, 0, 0.6);
  }
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 20px;
}

.gallery-item {
  background: linear-gradient(135deg, #fff8dc 0%, #fffacd 100%);
  border: 4px solid #f7a985;
  border-radius: 20px;
  box-shadow: 
    0px 8px 16px rgba(255, 99, 71, 0.3),
    0px 4px 8px rgba(255, 140, 66, 0.2),
    inset 0px 2px 0px rgba(255, 255, 255, 0.5);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: all 0.3s cubic-bezier(.4, 2, .6, 1);
  position: relative;
  overflow: hidden;
}

.gallery-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  transition: left 0.5s ease;
}

.gallery-item:hover::before {
  left: 100%;
}

.gallery-item:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0px 6px 12px rgba(255, 140, 66, 0.3);
}

.gallery-item .gallery-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 15px;
  margin-bottom: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.gallery-item:hover .gallery-image {
  transform: scale(1.05);
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
}

.gallery-item .gallery-info {
  font-size: 0.9rem;
  color: #8b4513;
  
  text-shadow: 1px 1px 0px rgba(255, 255, 255, 0.5);
  letter-spacing: 0.3px;
  line-height: 1.3;
  margin-bottom: 10px;
}

.gallery-item .gallery-actions {
  display: flex;
  justify-content: space-around;
  width: 100%;
}

.gallery-item .gallery-actions .el-button {
  background: linear-gradient(135deg, #ffd700, #ffb347);
  color: #8b4513;
  
  border: none;
  border-radius: 10px;
  padding: 8px 15px;
  box-shadow: 0px 4px 8px rgba(255, 140, 66, 0.2);
  transition: all 0.3s ease;
}

.gallery-item .gallery-actions .el-button:hover {
  background: linear-gradient(135deg, #ffb347, #ff8c42);
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0px 6px 12px rgba(255, 140, 66, 0.3);
}

.gallery-item .gallery-actions .el-button .el-icon {
  margin-right: 5px;
}

.gallery-item .gallery-actions .el-button.download-button {
  background: linear-gradient(135deg, #2e8b57, #32cd32);
  color: #fff;
}

.gallery-item .gallery-actions .el-button.download-button:hover {
  background: linear-gradient(135deg, #32cd32, #2e8b57);
}

.gallery-item .gallery-actions .el-button.download-button .el-icon {
  color: #fff;
}

.gallery-item .gallery-actions .el-button.share-button {
  background: linear-gradient(135deg, #8b4513, #ff8c42);
  color: #fff;
}

.gallery-item .gallery-actions .el-button.share-button:hover {
  background: linear-gradient(135deg, #ff8c42, #8b4513);
}

.gallery-item .gallery-actions .el-button.share-button .el-icon {
  color: #fff;
}

.gallery-item .gallery-actions .el-button.disabled {
  background: linear-gradient(135deg, #cccccc, #999999) !important;
  color: #666666 !important;
  cursor: not-allowed !important;
  opacity: 0.6;
  border-color: #bbbbbb !important;
  box-shadow: 
    0px 3px 6px rgba(0, 0, 0, 0.1),
    inset 0px 1px 0px rgba(255, 255, 255, 0.2) !important;
  transform: none !important;
  pointer-events: none;
}

.gallery-item .gallery-actions .el-button.disabled::before {
  display: none !important;
}

.gallery-item .gallery-actions .el-button.disabled:hover {
  background: linear-gradient(135deg, #cccccc, #999999) !important;
  transform: none !important;
  box-shadow: 
    0px 3px 6px rgba(0, 0, 0, 0.1),
    inset 0px 1px 0px rgba(255, 255, 255, 0.2) !important;
}

.gallery-item .gallery-actions .el-button.disabled .el-icon {
  color: #666666 !important;
  filter: none !important;
  text-shadow: none !important;
}

/* 响应式设计 */
@media (max-width: 768px) {
  /* 移动端加载圆圈优化 */
  .loading-spinner {
    width: 60px;
    height: 60px;
    border-width: 6px;
  }

  .loading-status {
    font-size: 0.9rem;
  }

  .progress-circle {
    width: 100px;
    height: 100px;
  }

  .progress-ring {
    width: 100px;
    height: 100px;
  }

  .progress-ring-circle {
    r: 42;
    cx: 50;
    cy: 50;
    stroke-width: 6;
  }

  .progress-text {
    font-size: 1.2rem;
  }

  .progress-status {
    font-size: 0.9rem;
  }

  /* 移动端重新生成按钮优化 */
  .failed-actions .el-button,
  .loading-actions .el-button,
  .progress-actions .el-button {
    font-size: 0.7rem;
    padding: 0.4em 0.8em;
    min-width: 80px;
  }

  .image-actions .el-button {
    font-size: 0.7rem;
    padding: 0.3em 0.5em;
  }

  /* 移动端图片操作按钮布局优化 */
  .image-actions {
    flex-direction: column;
    gap: 3px;
  }

  .image-actions .el-button {
    min-width: 28px;
    height: 28px;
    padding: 0.2em 0.3em;
  }
}

/* 原生输入框卡通立体样式 */
.cartoon-input {
  border: 4px solid #f7a985;
  border-radius: 20px;
  padding: 10px 15px;
  font-size: 1rem;
  
  letter-spacing: 0.5px;
  background: linear-gradient(135deg, #fff8dc 0%, #fffacd 100%);
  box-shadow: 
    0px 8px 16px rgba(255, 99, 71, 0.3),
    0px 4px 8px rgba(255, 140, 66, 0.2),
    inset 0px 2px 0px rgba(255, 255, 255, 0.5);
  transition: all 0.3s ease;
}

.cartoon-input:focus {
  outline: none;
  border-color: #ff8c42;
  box-shadow: 
    0px 8px 16px rgba(255, 99, 71, 0.4),
    0px 4px 8px rgba(255, 140, 66, 0.3),
    inset 0px 2px 0px rgba(255, 255, 255, 0.6);
}

.cartoon-input::placeholder {
  color: #8b4513;
  opacity: 0.8;
}

/* 卡通按钮样式 */
.cartoon-button {
  background: linear-gradient(135deg, #ffd700, #ffb347);
  color: #8b4513;
  
  border: none;
  border-radius: 20px;
  padding: 12px 20px;
  font-size: 1rem;
  letter-spacing: 0.5px;
  box-shadow: 
    0px 8px 16px rgba(255, 99, 71, 0.3),
    0px 4px 8px rgba(255, 140, 66, 0.2),
    inset 0px 2px 0px rgba(255, 255, 255, 0.5);
  transition: all 0.3s ease;
  cursor: pointer;
}

.cartoon-button:hover {
  background: linear-gradient(135deg, #ffb347, #ff8c42);
  transform: translateY(-3px);
  box-shadow: 
    0px 12px 24px rgba(255, 99, 71, 0.4),
    0px 6px 12px rgba(255, 140, 66, 0.3),
    inset 0px 2px 0px rgba(255, 255, 255, 0.6);
}

.cartoon-button:active {
  transform: translateY(0px);
  box-shadow: 
    0px 8px 16px rgba(255, 99, 71, 0.3),
    0px 4px 8px rgba(255, 140, 66, 0.2),
    inset 0px 2px 0px rgba(255, 255, 255, 0.5);
}

.cartoon-button.disabled {
  background: linear-gradient(135deg, #cccccc, #999999) !important;
  color: #666666 !important;
  cursor: not-allowed !important;
  opacity: 0.6;
  border-color: #bbbbbb !important;
  box-shadow: 
    0px 3px 6px rgba(0, 0, 0, 0.1),
    inset 0px 1px 0px rgba(255, 255, 255, 0.2) !important;
  transform: none !important;
  pointer-events: none;
}

.cartoon-button.disabled:hover {
  background: linear-gradient(135deg, #cccccc, #999999) !important;
  transform: none !important;
  box-shadow: 
    0px 3px 6px rgba(0, 0, 0, 0.1),
    inset 0px 1px 0px rgba(255, 255, 255, 0.2) !important;
}

.cartoon-button .el-icon {
  margin-right: 5px;
  font-size: 1.2rem;
  vertical-align: middle;
}

/* 卡通标题样式 */
.cartoon-title {
  font-size: 2rem;
  font-weight: 800;
  color: #8b4513;
  margin-bottom: 15px;
  text-shadow: 2px 2px 0px #ffd700;
  letter-spacing: 1px;
  animation: titleGlow 3s ease-in-out infinite;
}

@keyframes titleGlow {
  0%, 100% {
    text-shadow: 2px 2px 0px #ffd700;
  }
  50% {
    text-shadow: 2px 2px 0px #ffd700, 0 0 15px rgba(255, 215, 0, 0.6);
  }
}

/* 卡通副标题样式 */
.cartoon-subtitle {
  font-size: 1.3rem;
  color: #4a2c17;
  margin-bottom: 30px;
  
  text-shadow: 1px 1px 0px #fff8dc;
  letter-spacing: 0.5px;
}

/* 卡通步骤样式 */
.cartoon-steps {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  max-width: 500px;
  margin: 0 auto;
}

.cartoon-step-item {
  background: rgba(255, 255, 255, 0.7);
  border: 3px solid #f7a985;
  border-radius: 15px;
  padding: 15px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: all 0.3s cubic-bezier(.4, 2, .6, 1);
  box-shadow: 0px 4px 8px rgba(255, 140, 66, 0.2);
  position: relative;
  overflow: hidden;
}

.cartoon-step-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  transition: left 0.5s ease;
}

.cartoon-step-item:hover::before {
  left: 100%;
}

.cartoon-step-item:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0px 6px 12px rgba(255, 140, 66, 0.3);
}

.cartoon-step-item.completed {
  background: linear-gradient(135deg, rgba(46, 139, 87, 0.1), rgba(34, 139, 34, 0.1));
  border-color: #32cd32;
  box-shadow: 
    0px 4px 8px rgba(46, 139, 87, 0.3),
    0px 0px 15px rgba(46, 139, 87, 0.2);
}

.cartoon-step-icon {
  font-size: 2.2rem;
  margin-bottom: 8px;
  filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.1));
  animation: stepIconBounce 2s ease-in-out infinite;
}

@keyframes stepIconBounce {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-3px);
  }
}

.cartoon-step-text {
  font-size: 0.9rem;
  color: #8b4513;
  
  text-shadow: 1px 1px 0px rgba(255, 255, 255, 0.5);
  letter-spacing: 0.3px;
  line-height: 1.3;
}

.cartoon-step-item.completed .cartoon-step-icon {
  color: #2e8b57;
  animation: completedPulse 2s ease-in-out infinite;
}

.cartoon-step-item.completed .cartoon-step-text {
  color: #2e8b57;
}

@keyframes completedPulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .cartoon-steps {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .cartoon-step-item {
    padding: 12px 8px;
  }

  .cartoon-step-icon {
    font-size: 1.8rem;
  }

  .cartoon-step-text {
    font-size: 0.8rem;
  }
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

@keyframes iconBounce {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-3px);
  }
}
.native-message.native-message--hidden {
  opacity: 0;
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

/* 下载选择弹窗样式 */
.download-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(255, 140, 66, 0.3) 0%, rgba(139, 69, 19, 0.6) 100%);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  animation: overlayFadeIn 0.3s ease;
}

@keyframes overlayFadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.download-modal {
  background: linear-gradient(135deg, #fff8dc 0%, #fffacd 100%);
  border: 6px solid #f7a985;
  border-radius: 25px;
  padding: 30px;
  box-shadow: 
    0px 12px 24px rgba(255, 99, 71, 0.4),
    0px 6px 12px rgba(255, 140, 66, 0.3),
    inset 0px 2px 0px rgba(255, 255, 255, 0.6);
  max-width: 500px;
  width: 90%;
  position: relative;
  overflow: hidden;
  animation: modalSlideIn 0.3s cubic-bezier(.4, 2, .6, 1);
}

@keyframes modalSlideIn {
  0% {
    transform: translateY(-50px) scale(0.9);
    opacity: 0;
  }
  100% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}

.download-modal::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(45deg, transparent, rgba(255, 215, 0, 0.1), transparent);
  animation: modalShimmer 3s linear infinite;
}

@keyframes modalShimmer {
  0% {
    transform: translateX(-100%) translateY(-100%) rotate(45deg);
  }
  100% {
    transform: translateX(100%) translateY(100%) rotate(45deg);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  position: relative;
  z-index: 2;
}

.modal-header h3 {
  color: #8b4513;
  font-size: 1.8rem;
  font-weight: 800;
  margin: 0;
  text-shadow: 2px 2px 0px #ffd700;
  letter-spacing: 1px;
  font-family: 'CuteFont64', cursive;
}

.modal-close {
  cursor: pointer;
  font-size: 1.8rem;
  color: #8b4513;
  font-weight: 800;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ffb347, #ff8c42);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 8px rgba(255, 140, 66, 0.3);
  transition: all 0.3s cubic-bezier(.4, 2, .6, 1);
  border: 3px solid #f7a985;
}

.modal-close:hover {
  transform: translateY(-2px) scale(1.1);
  background: linear-gradient(135deg, #ff8c42, #ff6347);
  box-shadow: 0px 6px 12px rgba(255, 140, 66, 0.4);
}

.modal-close:active {
  transform: translateY(0) scale(1);
}

.modal-content {
  position: relative;
  z-index: 2;
}

.download-options {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

.download-option {
  background: linear-gradient(135deg, #fff8dc 0%, #fffacd 100%);
  border: 4px solid #f7a985;
  border-radius: 20px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(.4, 2, .6, 1);
  box-shadow: 
    0px 4px 8px rgba(255, 140, 66, 0.2),
    inset 0px 2px 0px rgba(255, 255, 255, 0.5);
  position: relative;
  overflow: hidden;
}

.download-option::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  transition: left 0.5s ease;
}

.download-option:hover::before {
  left: 100%;
}

.download-option:hover {
  transform: translateY(-3px) scale(1.02);
  border-color: #ff8c42;
  box-shadow: 
    0px 8px 16px rgba(255, 140, 66, 0.3),
    0px 4px 8px rgba(255, 99, 71, 0.2),
    inset 0px 2px 0px rgba(255, 255, 255, 0.6);
}

.download-option:active {
  transform: translateY(-1px) scale(1.01);
  box-shadow: 
    0px 6px 12px rgba(255, 140, 66, 0.2),
    inset 0px 2px 0px rgba(255, 255, 255, 0.4);
}

.option-icon {
  font-size: 3rem;
  min-width: 60px;
  text-align: center;
  filter: drop-shadow(2px 2px 4px rgba(255, 140, 66, 0.3));
  animation: optionIconBounce 2s ease-in-out infinite;
}

@keyframes optionIconBounce {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
  }
}

.option-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.option-title {
  font-size: 1.4rem;
  font-weight: 800;
  color: #8b4513;
  margin: 0;
  text-shadow: 1px 1px 0px #ffd700;
  letter-spacing: 0.5px;
  font-family: 'CuteFont64', cursive;
}

.option-desc {
  font-size: 1rem;
  color: #cd853f;
  margin: 0;
  text-shadow: 1px 1px 0px rgba(255, 255, 255, 0.5);
  letter-spacing: 0.3px;
  font-family: 'CuteFont64', cursive;
}

/* 拖拽功能样式 */
.preview-item.draggable {
  cursor: move;
  transition: all 0.3s cubic-bezier(.4, 2, .6, 1);
}

.preview-item.draggable:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 
    0px 8px 16px rgba(255, 99, 71, 0.3),
    0px 4px 8px rgba(255, 140, 66, 0.2);
}

.preview-item.dragging {
  opacity: 0.5;
  transform: scale(0.95);
  filter: blur(2px);
  z-index: 100;
}

.preview-item.drag-over {
  border-color: #ff8c42 !important;
  box-shadow: 
    0px 0px 20px rgba(255, 140, 66, 0.6),
    0px 4px 8px rgba(255, 99, 71, 0.3),
    inset 0px 0px 20px rgba(255, 215, 0, 0.3);
  animation: dragOverPulse 0.5s ease-in-out infinite;
}

@keyframes dragOverPulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}


/* 响应式设计 */
@media (max-width: 768px) {
  .download-modal {
    max-width: 350px;
    padding: 20px;
  }

  .modal-header h3 {
    font-size: 1.5rem;
  }

  .modal-close {
    width: 35px;
    height: 35px;
    font-size: 1.5rem;
  }

  .download-option {
    padding: 15px;
    gap: 10px;
  }

  .option-icon {
    font-size: 2.5rem;
    min-width: 50px;
  }

  .option-title {
    font-size: 1.2rem;
  }

  .option-desc {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .download-modal {
    max-width: 300px;
    padding: 15px;
  }

  .modal-header h3 {
    font-size: 1.3rem;
  }

  .modal-close {
    width: 30px;
    height: 30px;
    font-size: 1.3rem;
  }

  .download-option {
    padding: 12px;
    gap: 8px;
  }

  .option-icon {
    font-size: 2rem;
    min-width: 40px;
  }

  .option-title {
    font-size: 1rem;
  }

  .option-desc {
    font-size: 0.8rem;
  }
}
</style>
