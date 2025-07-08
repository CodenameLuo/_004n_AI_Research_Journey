<template>
    <div class="stick-color">
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
                        <span class="title-char" style="--delay: 0s">简</span>
                        <span class="title-char" style="--delay: 0.1s">笔</span>
                        <span class="title-char" style="--delay: 0.2s">画</span>
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
                    <span class="subtitle-highlight">将你的简笔画变成精美图片</span>
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
            <!-- 左侧：绘画区域 -->
            <div class="drawing-section">
                <div class="section-title">
                    <h2>🖌️ 绘画区域</h2>
                </div>

                <!-- 绘画工具栏 -->
                <div class="drawing-toolbar">
                    <div class="tool-group">
                        <div class="tool-btn" :class="{ 'active': currentTool === 'pen' }" @click="selectTool('pen')" title="画笔">
                            <el-icon>
                                <EditPen />
                            </el-icon>
                            <span>画笔</span>
                        </div>
                        <div class="tool-btn" :class="{ 'active': currentTool === 'eraser' }" @click="selectTool('eraser')" title="橡皮擦">
                            <el-icon>
                                <Delete />
                            </el-icon>
                            <span>橡皮</span>
                        </div>
                        <div class="tool-btn clear-btn" @click="clearCanvas" title="清空画布">
                            <span>清空</span>
                        </div>
                    </div>

                    <!-- 橡皮擦大小调节滑块 -->
                    <div class="eraser-settings" v-if="currentTool === 'eraser'">
                        <div class="eraser-size-control">
                            <label>橡皮擦大小</label>
                            <input type="range" min="5" max="30" v-model="eraserSize" class="eraser-slider" />
                            <span class="size-display">{{ eraserSize }}px</span>
                        </div>
                    </div>
                </div>

                <!-- 绘画画布 -->
                <div class="canvas-container">
                    <canvas ref="canvas" class="drawing-canvas" @mousedown="startDrawing" @mousemove="draw" @mouseup="stopDrawing" @mouseleave="stopDrawing" @touchstart.passive="handleTouchStart" @touchmove.passive="handleTouchMove" @touchend.passive="handleTouchEnd"></canvas>

                    <!-- 画布提示 -->
                    <div class="canvas-hint" v-if="!hasDrawing">
                        <el-icon class="hint-icon">
                            <EditPen />
                        </el-icon>
                        <div class="hint-text">在这里绘制你的简笔画</div>
                        <div class="hint-subtext">支持鼠标和触屏绘制</div>
                    </div>
                </div>

                <!-- 移动端提示词输入（仅在移动端显示） -->
                <div class="mobile-prompt-section">
                    <div class="prompt-inputs">
                        <!-- 物体描述输入 -->
                        <div class="input-group">
                            <div class="input-header">
                                <label>你画的是什么？</label>
                                <div class="input-controls">
                                    <div class="voice-input-btn" :class="{ 'recording': isRecording && recordingType === 'object' }" @mousedown="startRecording('object')" @mouseup="stopRecording" @mouseleave="stopRecording" @touchstart.passive="startRecording('object')" @touchend.passive="stopRecording" @touchcancel.passive="stopRecording" :title="isRecording && recordingType === 'object' ? '录音中...' : '按住说话'">
                                        <el-icon v-if="!(isRecording && recordingType === 'object')">
                                            <Microphone />
                                        </el-icon>
                                        <div v-else class="recording-indicator">
                                            <div class="pulse-ring"></div>
                                            <el-icon>
                                                <Microphone />
                                            </el-icon>
                                        </div>
                                    </div>
                                    <el-button type="warning" size="small" @click="clearObjectPrompt" :disabled="!objectPrompt.trim()" class="clear-btn">
                                        <el-icon>
                                            <Delete />
                                        </el-icon>
                                        清空
                                    </el-button>
                                </div>
                            </div>
                            <textarea v-model="objectPrompt" placeholder="详细描述你想画的物体，比如：一只可爱的小猫、一朵向日葵、一座城堡..." class="prompt-textarea" rows="3" @input="handlePromptInput"></textarea>
                        </div>

                        <!-- 颜色描述输入 -->
                        <div class="input-group">
                            <div class="input-header">
                                <label>你想要的颜色？</label>
                                <div class="input-controls">
                                    <div class="voice-input-btn" :class="{ 'recording': isRecording && recordingType === 'color' }" @mousedown="startRecording('color')" @mouseup="stopRecording" @mouseleave="stopRecording" @touchstart.passive="startRecording('color')" @touchend.passive="stopRecording" @touchcancel.passive="stopRecording" :title="isRecording && recordingType === 'color' ? '录音中...' : '按住说话'">
                                        <el-icon v-if="!(isRecording && recordingType === 'color')">
                                            <Microphone />
                                        </el-icon>
                                        <div v-else class="recording-indicator">
                                            <div class="pulse-ring"></div>
                                            <el-icon>
                                                <Microphone />
                                            </el-icon>
                                        </div>
                                    </div>
                                    <el-button type="warning" size="small" @click="clearColorPrompt" :disabled="!colorPrompt.trim()" class="clear-btn">
                                        <el-icon>
                                            <Delete />
                                        </el-icon>
                                        清空
                                    </el-button>
                                </div>
                            </div>
                            <textarea v-model="colorPrompt" placeholder="描述你想要给简笔画涂上什么颜色，比如：鲜艳的红色和黄色、温暖的橙色、清新的蓝绿色..." class="prompt-textarea" rows="3" @input="handlePromptInput"></textarea>
                        </div>

                        <!-- 风格选择 -->
                        <div class="input-group">
                            <div class="input-header">
                                <label>你想要的风格？</label>
                            </div>
                            <div class="custom-select-wrapper">
                                <div 
                                    class="custom-select" 
                                    :class="{ 'is-open': isStyleSelectOpen }"
                                    @click="toggleStyleSelect"
                                >
                                    <div class="select-display">
                                        {{ selectedStyle ? selectedStyle.name : '请选择图片风格' }}
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
                                        :class="{ 'is-selected': selectedStyle && selectedStyle.name === style.name }"
                                        v-for="style in styleTemplates" 
                                        :key="style.name"
                                        @click="selectStyle(style)"
                                    >
                                        {{ style.name }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- 移动端生成按钮 -->
                    <div class="generate-btn-wrapper">
                        <el-button type="primary" size="large" @click="generateImage" :loading="isGenerating" :disabled="!hasDrawing || !objectPrompt.trim() || !selectedStyle" class="generate-btn">
                            <el-icon>
                                <MagicStick />
                            </el-icon>
                            {{ isGenerating ? '正在生成中...' : '生成精美图片' }}
                        </el-button>
                    </div>
                </div>
            </div>

            <!-- 中间：提示词输入区域（仅在PC端显示） -->
            <div class="description-section">
                <div class="section-title">
                    <h2>✨ 描述创作</h2>
                </div>

                <div class="prompt-inputs">
                    <!-- 物体描述输入 -->
                    <div class="input-group">
                        <div class="input-header">
                            <label>你画的是什么？</label>
                            <div class="input-controls">
                                <div class="voice-input-btn" :class="{ 'recording': isRecording && recordingType === 'object' }" @mousedown="startRecording('object')" @mouseup="stopRecording" @mouseleave="stopRecording" @touchstart.passive="startRecording('object')" @touchend.passive="stopRecording" @touchcancel.passive="stopRecording" :title="isRecording && recordingType === 'object' ? '录音中...' : '按住说话'">
                                    <el-icon v-if="!(isRecording && recordingType === 'object')">
                                        <Microphone />
                                    </el-icon>
                                    <div v-else class="recording-indicator">
                                        <div class="pulse-ring"></div>
                                        <el-icon>
                                            <Microphone />
                                        </el-icon>
                                    </div>
                                </div>
                                <el-button type="warning" size="small" @click="clearObjectPrompt" :disabled="!objectPrompt.trim()" class="clear-btn">
                                    <el-icon>
                                        <Delete />
                                    </el-icon>
                                    清空
                                </el-button>
                            </div>
                        </div>
                        <textarea v-model="objectPrompt" placeholder="详细描述你想画的物体，比如：一只可爱的小猫、一朵向日葵、一座城堡..." class="prompt-textarea" rows="3" @input="handlePromptInput"></textarea>
                    </div>

                    <!-- 颜色描述输入 -->
                    <div class="input-group">
                        <div class="input-header">
                            <label>你想要的颜色？</label>
                            <div class="input-controls">
                                <div class="voice-input-btn" :class="{ 'recording': isRecording && recordingType === 'color' }" @mousedown="startRecording('color')" @mouseup="stopRecording" @mouseleave="stopRecording" @touchstart.passive="startRecording('color')" @touchend.passive="stopRecording" @touchcancel.passive="stopRecording" :title="isRecording && recordingType === 'color' ? '录音中...' : '按住说话'">
                                    <el-icon v-if="!(isRecording && recordingType === 'color')">
                                        <Microphone />
                                    </el-icon>
                                    <div v-else class="recording-indicator">
                                        <div class="pulse-ring"></div>
                                        <el-icon>
                                            <Microphone />
                                        </el-icon>
                                    </div>
                                </div>
                                <el-button type="warning" size="small" @click="clearColorPrompt" :disabled="!colorPrompt.trim()" class="clear-btn">
                                    <el-icon>
                                        <Delete />
                                    </el-icon>
                                    清空
                                </el-button>
                            </div>
                        </div>
                        <textarea v-model="colorPrompt" placeholder="描述你想要给简笔画涂上什么颜色，比如：鲜艳的红色和黄色、温暖的橙色、清新的蓝绿色..." class="prompt-textarea" rows="3" @input="handlePromptInput"></textarea>
                    </div>

                    <!-- 风格选择 -->
                    <div class="input-group">
                        <div class="input-header">
                            <label>你想要的风格？</label>
                        </div>
                        <div class="custom-select-wrapper">
                            <div 
                                class="custom-select" 
                                :class="{ 'is-open': isStyleSelectOpen }"
                                @click="toggleStyleSelect"
                            >
                                <div class="select-display">
                                    {{ selectedStyle ? selectedStyle.name : '请选择图片风格' }}
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
                                    :class="{ 'is-selected': selectedStyle && selectedStyle.name === style.name }"
                                    v-for="style in styleTemplates" 
                                    :key="style.name"
                                    @click="selectStyle(style)"
                                >
                                    {{ style.name }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- PC端生成按钮 -->
                <div class="generate-btn-wrapper">
                    <el-button type="primary" size="large" @click="generateImage" :loading="isGenerating" :disabled="!hasDrawing || !objectPrompt.trim() || !selectedStyle" class="generate-btn">
                        <el-icon>
                            <MagicStick />
                        </el-icon>
                        {{ isGenerating ? '正在生成中...' : '生成精美图片' }}
                    </el-button>
                </div>
            </div>

            <!-- 右侧：输出区域 -->
            <div class="output-section">
                <div class="section-title">
                    <h2>🖼️ 生成结果</h2>
                </div>

                <!-- 右上角操作按钮 -->
                <div class="output-corner-actions" v-if="generatedImage">
                    <div class="corner-button download-btn" @click="downloadImage" title="下载图片">
                        <el-icon>
                            <Download />
                        </el-icon>
                    </div>
                    <div class="corner-button share-btn" @click="shareImage" title="分享图片">
                        <el-icon>
                            <Share />
                        </el-icon>
                    </div>
                </div>

                <div class="image-preview">
                    <div class="preview-placeholder" v-if="!generatedImage">
                        <el-icon class="placeholder-icon">
                            <Picture />
                        </el-icon>
                        <div class="placeholder-text">生成的图片将在这里显示</div>
                        <div class="placeholder-hint">绘制简笔画并点击生成开始创作</div>
                    </div>
                    <div class="preview-image" v-else>
                        <img :src="generatedImage" alt="生成的图片" />
                    </div>
                </div>
            </div>
        </div>

        <!-- 原生消息提示容器 -->
        <div class="native-message-container">
            <div v-for="message in messages" :key="message.id" :class="[
                'native-message',
                `native-message--${message.type}`,
                { 'native-message--visible': message.visible }
            ]" @click="closeMessage(message.id)">
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
import { ref, reactive, onMounted, onUnmounted, computed, nextTick, watch } from 'vue'
import { EditPen, Delete, Refresh, Picture, MagicStick, Download, Share, Microphone } from '@element-plus/icons-vue'
import styleTemplateData from '@/assets/style_template.json'

// API 配置
const API_CONFIG = {
    BASE_URL: 'http://localhost:7860',
    MODEL_NAME: 'dreamshaper_8' // 可以根据实际情况修改
}

// 画布相关
const canvas = ref(null)
const ctx = ref(null)
const isDrawing = ref(false)
const currentTool = ref('pen')
const eraserSize = ref(10)
const hasDrawing = ref(false)

// 绘画相关状态
const lastX = ref(0)
const lastY = ref(0)

// 提示词 - 修改为三个独立的输入
const objectPrompt = ref('')  // 物体描述
const colorPrompt = ref('')   // 颜色描述
const selectedStyle = ref(null)  // 选择的风格

// 风格模板数据
const styleTemplates = ref(styleTemplateData)

// 生成状态
const isGenerating = ref(false)
const generatedImage = ref(null)

// 语音识别相关状态
const isRecording = ref(false)
const recordingType = ref('') // 'object', 'color'
const recognition = ref(null)
const isRecognitionSupported = ref(false)
const isRecognitionActive = ref(false)

// 风格选择下拉菜单状态
const isStyleSelectOpen = ref(false)

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

// 检测文本是否包含中文
const containsChinese = (text) => {
    return /[\u4e00-\u9fa5]/.test(text)
}

// 翻译中文到英文（使用API）
const translateToEnglish = async (chineseText) => {
    if (!chineseText || !containsChinese(chineseText)) {
        return chineseText
    }

    try {
        // 使用Google Translate API（免费版本）
        const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=zh&tl=en&dt=t&q=${encodeURIComponent(chineseText)}`)

        if (!response.ok) {
            throw new Error(`翻译API请求失败: ${response.status}`)
        }

        const result = await response.json()

        if (result && result[0] && result[0][0] && result[0][0][0]) {
            return result[0][0][0]
        }

        // 如果API返回格式不正确，返回原文
        return chineseText

    } catch (error) {
        console.error('翻译失败:', error)
        // 翻译失败时返回原文
        return chineseText
    }
}

// 智能翻译提示词（始终执行翻译）
const smartTranslatePrompt = async (originalPrompt) => {
    if (!originalPrompt) {
        return originalPrompt
    }

    try {
        const translatedPrompt = await translateToEnglish(originalPrompt.trim())

        // 只在控制台记录翻译结果，不显示UI提示
        if (translatedPrompt !== originalPrompt.trim() && containsChinese(originalPrompt)) {
            console.log('提示词翻译:', originalPrompt, '->', translatedPrompt)
        }

        return translatedPrompt
    } catch (error) {
        console.error('智能翻译失败:', error)
        return originalPrompt
    }
}

// 初始化画布
const initCanvas = () => {
    nextTick(() => {
        if (!canvas.value) return

        ctx.value = canvas.value.getContext('2d')

        // 设置画布大小
        const container = canvas.value.parentElement
        canvas.value.width = container.clientWidth
        canvas.value.height = container.clientHeight

        // 设置画布样式
        ctx.value.lineCap = 'round'
        ctx.value.lineJoin = 'round'
        ctx.value.strokeStyle = '#333'
        ctx.value.lineWidth = currentTool.value === 'eraser' ? eraserSize.value : 3

        // 设置白色背景
        ctx.value.fillStyle = '#ffffff'
        ctx.value.fillRect(0, 0, canvas.value.width, canvas.value.height)
    })
}

// 工具选择
const selectTool = (tool) => {
    currentTool.value = tool
    if (tool === 'pen') {
        ctx.value.globalCompositeOperation = 'source-over'
        ctx.value.strokeStyle = '#333'
        ctx.value.lineWidth = 3
    } else if (tool === 'eraser') {
        ctx.value.globalCompositeOperation = 'destination-out'
        ctx.value.lineWidth = eraserSize.value
    }
}

// 清空画布
const clearCanvas = () => {
    if (!ctx.value) return

    ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height)
    // 重新设置白色背景
    ctx.value.fillStyle = '#ffffff'
    ctx.value.fillRect(0, 0, canvas.value.width, canvas.value.height)

    hasDrawing.value = false
    NativeMessage.info('画布已清空')
}

// 获取鼠标在画布上的坐标
const getMousePos = (e) => {
    const rect = canvas.value.getBoundingClientRect()
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    }
}

// 获取触摸在画布上的坐标
const getTouchPos = (e) => {
    const rect = canvas.value.getBoundingClientRect()
    return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
    }
}

// 开始绘制
const startDrawing = (e) => {
    e.preventDefault()
    isDrawing.value = true

    const pos = getMousePos(e)
    lastX.value = pos.x
    lastY.value = pos.y

    ctx.value.lineWidth = currentTool.value === 'eraser' ? eraserSize.value : 3
    ctx.value.beginPath()
    ctx.value.moveTo(pos.x, pos.y)
}

// 绘制
const draw = (e) => {
    if (!isDrawing.value) return
    e.preventDefault()

    const pos = getMousePos(e)

    ctx.value.lineTo(pos.x, pos.y)
    ctx.value.stroke()

    lastX.value = pos.x
    lastY.value = pos.y

    hasDrawing.value = true
}

// 停止绘制
const stopDrawing = (e) => {
    if (!isDrawing.value) return
    e.preventDefault()
    isDrawing.value = false
    ctx.value.beginPath()
}

// 触摸事件处理
const handleTouchStart = (e) => {
    e.preventDefault()
    if (e.touches.length === 1) {
        isDrawing.value = true
        const pos = getTouchPos(e)
        lastX.value = pos.x
        lastY.value = pos.y

        ctx.value.lineWidth = currentTool.value === 'eraser' ? eraserSize.value : 3
        ctx.value.beginPath()
        ctx.value.moveTo(pos.x, pos.y)
    }
}

const handleTouchMove = (e) => {
    if (!isDrawing.value || e.touches.length !== 1) return
    e.preventDefault()

    const pos = getTouchPos(e)

    ctx.value.lineTo(pos.x, pos.y)
    ctx.value.stroke()

    lastX.value = pos.x
    lastY.value = pos.y

    hasDrawing.value = true
}

const handleTouchEnd = (e) => {
    if (!isDrawing.value) return
    e.preventDefault()
    isDrawing.value = false
    ctx.value.beginPath()
}

// 清空提示词
const clearObjectPrompt = () => {
    if (objectPrompt.value.trim()) {
        objectPrompt.value = ''
        NativeMessage.info('物体描述已清空')
    }
}

const clearColorPrompt = () => {
    if (colorPrompt.value.trim()) {
        colorPrompt.value = ''
        NativeMessage.info('颜色描述已清空')
    }
}

// 风格选择相关方法
const toggleStyleSelect = () => {
    isStyleSelectOpen.value = !isStyleSelectOpen.value
}

const selectStyle = (style) => {
    selectedStyle.value = style
    isStyleSelectOpen.value = false
    NativeMessage.info(`已选择风格：${style.name}`)
}

// 处理提示词输入
const handlePromptInput = (event) => {
    // 保留事件处理器以备将来使用
}

// 检查可用的 ControlNet 模型
const getAvailableControlNetModel = async () => {
    try {
        const response = await fetch(`${API_CONFIG.BASE_URL}/controlnet/model_list`)
        const models = await response.json()

        // 优先选择 scribble 相关模型
        const scribbleModels = models.model_list.filter(model =>
            model.includes('scribble') || model.includes('sketch')
        )

        if (scribbleModels.length > 0) {
            console.log('找到ControlNet模型:', scribbleModels[0])
            return scribbleModels[0]
        }

        // 如果没有找到，返回默认模型
        return "control_v11p_sd15_scribble [d4ba51ff]"
    } catch (error) {
        console.warn('获取ControlNet模型列表失败:', error)
        return "control_v11p_sd15_scribble [d4ba51ff]"
    }
}

// 生成图片（调用 Stable Diffusion WebUI API）
const generateImage = async () => {
    if (!hasDrawing.value) {
        NativeMessage.warning('请先绘制简笔画！')
        return
    }

    // 验证必填项
    if (!objectPrompt.value.trim()) {
        NativeMessage.warning('请描述你画的是什么！')
        return
    }

    if (!selectedStyle.value) {
        NativeMessage.warning('请选择图片风格！')
        return
    }

    isGenerating.value = true

    try {
        NativeMessage.info('正在生成精美图片，请稍候...')

        // 获取画布图像数据
        const imgData = canvas.value.toDataURL("image/png")

        // 构建完整的提示词：物体描述 + 颜色描述 + 风格模板
        let fullPrompt = objectPrompt.value.trim()
        
        // 添加颜色描述（如果有）
        if (colorPrompt.value.trim()) {
            fullPrompt += ', ' + colorPrompt.value.trim()
        }

        // 使用选择的风格模板构建最终提示词
        const styleTemplate = selectedStyle.value.prompt
        const userPrompt = await smartTranslatePrompt(styleTemplate.replace('{prompt}', fullPrompt))

        // 使用风格模板的负面提示词
        const negativePrompt = selectedStyle.value.negative_prompt || "realistic, photo, 3d, nude, nsfw, blurry, watermark, text, signature, ugly, disfigured, mutated, extra arms, extra legs, extra fingers, extra eyes, poorly drawn, low quality, bad anatomy, worst quality"

        // 第一步：设置模型（可选）
        try {
            await fetch(`${API_CONFIG.BASE_URL}/sdapi/v1/options`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ sd_model_checkpoint: API_CONFIG.MODEL_NAME })
            })
        } catch (modelError) {
            console.warn('设置模型失败，继续使用当前模型:', modelError)
        }

        // 获取可用的 ControlNet 模型
        const controlNetModel = await getAvailableControlNetModel()


        // 第二步：构建 img2img 请求参数
        const payload = {
            init_images: [imgData],
            prompt: userPrompt,
            negative_prompt: negativePrompt,
            steps: 30,
            cfg_scale: 7.5,
            width: 512,
            height: 512,
            sampler_index: "DPM++ 2M Karras",
            denoising_strength: 0.75, // 降低去噪强度，更好地保持草图结构
            controlnet_units: [{
                input_image: imgData,
                module: "scribble_hed",
                model: controlNetModel,
                weight: 1.2, // 增加ControlNet影响权重
                guidance_start: 0.0,
                guidance_end: 1.0,
                processor_res: 512,
                threshold_a: 64,
                threshold_b: 64,
                resize_mode: "Crop and Resize",
                control_mode: "Balanced", // 平衡模式，更好地结合提示词和控制图
                pixel_perfect: true,
                enabled: true
            }]
        }

        // 第三步：调用 img2img API
        let response
        let result

        try {
            // 首先尝试使用 ControlNet
            response = await fetch(`${API_CONFIG.BASE_URL}/sdapi/v1/img2img`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            })

            if (!response.ok) {
                throw new Error(`ControlNet请求失败: ${response.status}`)
            }

            result = await response.json()
            console.log('ControlNet生成成功，草图结构已被保留')

        } catch (controlNetError) {
            console.warn('ControlNet失败，尝试备用方案:', controlNetError)

            // 备用方案：不使用 ControlNet，但降低去噪强度以保留更多原图特征
            const backupPayload = {
                ...payload,
                denoising_strength: 0.25, // 进一步降低去噪强度
                controlnet_units: [] // 移除 ControlNet
            }

            response = await fetch(`${API_CONFIG.BASE_URL}/sdapi/v1/img2img`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(backupPayload)
            })

            if (!response.ok) {
                throw new Error(`API请求失败: ${response.status} ${response.statusText}`)
            }

            result = await response.json()
            NativeMessage.info('使用备用模式生成（未使用ControlNet）')
        }

        if (!result.images || result.images.length === 0) {
            throw new Error('API返回结果为空')
        }

        // 设置生成的图片
        generatedImage.value = "data:image/png;base64," + result.images[0]

        NativeMessage.success(`图片生成成功！使用了${selectedStyle.value.name}风格`)

    } catch (error) {
        console.error('生成错误:', error)

        // 根据错误类型显示不同的提示信息
        if (error.message.includes('Failed to fetch') || error.message.includes('Network')) {
            NativeMessage.error('无法连接到后端服务，请确保 Stable Diffusion WebUI 已启动并开启API功能（使用 --api 参数）')
        } else if (error.message.includes('404')) {
            NativeMessage.error('API接口不存在，请确保后端服务支持 img2img API')
        } else if (error.message.includes('500')) {
            NativeMessage.error('后端服务内部错误，请检查模型是否正确加载')
        } else {
            NativeMessage.error('图片生成失败：' + (error.message || '未知错误'))
        }

        generatedImage.value = null
    } finally {
        isGenerating.value = false
    }
}

// 下载功能
const downloadImage = () => {
    if (!generatedImage.value) {
        NativeMessage.warning('请先生成图片！')
        return
    }

    // 下载生成的图片
    if (generatedImage.value.startsWith('data:image')) {
        const link = document.createElement('a')
        link.href = generatedImage.value
        link.download = '简笔画作品.png'
        link.click()
    } else {
        fetch(generatedImage.value)
            .then(response => response.blob())
            .then(blob => {
                const link = document.createElement('a')
                link.href = URL.createObjectURL(blob)
                link.download = '简笔画作品.png'
                link.click()
                URL.revokeObjectURL(link.href)
            })
            .catch(error => {
                console.error('下载失败:', error)
                NativeMessage.error('下载失败！')
            })
    }

    NativeMessage.success('开始下载图片...')
}

// 分享功能
const shareImage = async () => {
    if (!generatedImage.value) {
        NativeMessage.warning('请先生成图片！')
        return
    }

    try {
        NativeMessage.info('准备分享您的作品...')

        if (navigator.share) {
            await navigator.share({
                title: '简笔画作品',
                text: '看看我用简笔画生成的精美图片！',
                url: generatedImage.value
            })
            NativeMessage.success('分享成功！')
        } else {
            NativeMessage.success('您的作品已准备好分享！')
        }

    } catch (error) {
        console.error('分享失败:', error)
        NativeMessage.error('分享失败，请重试！')
    }
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
                // 根据录音类型决定更新哪个输入框
                if (recordingType.value === 'object') {
                    if (objectPrompt.value.trim()) {
                        // 检查当前描述是否以标点符号结尾
                        const lastChar = objectPrompt.value.trim().slice(-1)
                        const needsSeparator = !['.', '。', ',', '，', '!', '！', '?', '？', ';', '；'].includes(lastChar)

                        // 添加新的语音输入内容
                        const separator = needsSeparator ? '，' : ''
                        objectPrompt.value += separator + finalTranscript
                    } else {
                        // 如果描述为空，直接设置
                        objectPrompt.value = finalTranscript
                    }
                } else if (recordingType.value === 'color') {
                    if (colorPrompt.value.trim()) {
                        // 检查当前描述是否以标点符号结尾
                        const lastChar = colorPrompt.value.trim().slice(-1)
                        const needsSeparator = !['.', '。', ',', '，', '!', '！', '?', '？', ';', '；'].includes(lastChar)

                        // 添加新的语音输入内容
                        const separator = needsSeparator ? '，' : ''
                        colorPrompt.value += separator + finalTranscript
                    } else {
                        // 如果描述为空，直接设置
                        colorPrompt.value = finalTranscript
                    }
                }
            }
        }

        // 识别结束处理
        recognition.value.onend = () => {
            isRecording.value = false
            isRecognitionActive.value = false
            recordingType.value = ''
            NativeMessage.info('语音输入结束')
        }

        // 错误处理
        recognition.value.onerror = (event) => {
            console.error('语音识别错误:', event.error)
            isRecording.value = false
            isRecognitionActive.value = false
            recordingType.value = ''

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
const startRecording = (type) => {
    if (!isRecognitionSupported.value) {
        NativeMessage.warning('当前浏览器不支持语音输入功能')
        return
    }

    // 防止重复启动
    if (isRecognitionActive.value || isRecording.value) {
        return
    }

    isRecording.value = true
    recordingType.value = type

    try {
        recognition.value.start()
    } catch (error) {
        console.error('启动语音识别失败:', error)
        isRecording.value = false
        isRecognitionActive.value = false
        recordingType.value = ''
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
            recordingType.value = ''
        }
    } else {
        // 直接重置状态
        isRecording.value = false
        isRecognitionActive.value = false
        recordingType.value = ''
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
    if (!selectWrapper && isStyleSelectOpen.value) {
        isStyleSelectOpen.value = false
    }
}

// 窗口大小变化时重新调整画布
const handleResize = () => {
    if (canvas.value && ctx.value) {
        // 保存当前画布内容
        const imageData = ctx.value.getImageData(0, 0, canvas.value.width, canvas.value.height)

        // 重新设置画布大小
        const container = canvas.value.parentElement
        canvas.value.width = container.clientWidth
        canvas.value.height = container.clientHeight

        // 恢复画布设置
        ctx.value.lineCap = 'round'
        ctx.value.lineJoin = 'round'
        ctx.value.strokeStyle = '#333'
        ctx.value.lineWidth = currentTool.value === 'eraser' ? eraserSize.value : 3

        // 设置白色背景
        ctx.value.fillStyle = '#ffffff'
        ctx.value.fillRect(0, 0, canvas.value.width, canvas.value.height)

        // 恢复画布内容（如果有的话）
        if (hasDrawing.value) {
            ctx.value.putImageData(imageData, 0, 0)
        }
    }
}

// 监听橡皮擦大小变化
watch(eraserSize, (newSize) => {
    if (currentTool.value === 'eraser' && ctx.value) {
        ctx.value.lineWidth = newSize
    }
})

// 组件挂载时初始化
onMounted(() => {
    initCanvas()
    initSpeechRecognition()
    window.addEventListener('resize', handleResize)
    document.addEventListener('click', handleClickOutside)
})

// 组件卸载时清理事件监听
onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* 全局字体设置 - 使用本地64_fonts.ttf字体适合6-12岁儿童 */
.stick-color {
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
.stick-color *,
.stick-color *::before,
.stick-color *::after {
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
    grid-template-columns: 1fr 1fr 1fr; /* PC端三列等宽布局：绘画区域 + 提示词区域 + 输出区域 */
    gap: 25px;
    max-width: 1800px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
}

/* 三个区域共同样式 */
.drawing-section,
.description-section,
.output-section {
    background: #fff8dc;
    border-radius: 25px;
    padding: 25px;
    border: 6px solid #f7a985;
    box-shadow: 0px 10px #ff6347;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 20px;
    min-height: 600px; /* 确保三个板块都有统一的最小高度 */
}

/* PC端显示中间的提示词区域，隐藏移动端的提示词区域 */
.description-section {
    display: flex; /* PC端显示 */
}

.mobile-prompt-section {
    display: none; /* PC端隐藏 */
}

/* PC端描述创作区域的布局优化（仅在PC端生效） */
@media (min-width: 1001px) {
    .description-section {
        justify-content: space-between; /* 内容分布 */
    }

    .description-section .prompt-inputs {
        flex: 1; /* 占据剩余空间 */
        display: flex;
        flex-direction: column;
        gap: 15px;
        margin-bottom: 15px;
    }

    .description-section .generate-btn-wrapper {
        margin-top: auto; /* 推到底部 */
        flex-shrink: 0; /* 不压缩 */
    }
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

/* 绘画工具栏样式 */
.drawing-toolbar {
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 0.5);
    border: 3px solid #f7a985;
    border-radius: 15px;
    padding: 12px;
    box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.tool-group {
    display: flex;
    gap: 8px;
    align-items: center;
}

.tool-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    padding: 8px 12px;
    background: linear-gradient(135deg, #fff8dc, #fffacd);
    border: 2px solid #f7a985;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 0.8rem;
    color: #8b4513;
    font-weight: 600;
    text-shadow: 1px 1px 0px rgba(255, 255, 255, 0.5);
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    user-select: none;
    margin-left: 10px;
}

.tool-btn:hover {
    background: linear-gradient(135deg, #ffb347, #ffd700);
    transform: translateY(-1px);
    box-shadow: 0px 3px 6px rgba(255, 140, 66, 0.3);
    border-color: #ff8c42;
}

.tool-btn:active {
    transform: translateY(0);
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
}

.tool-btn.active {
    background: linear-gradient(135deg, #ff8c42, #ff6347);
    color: #fff;
    border-color: #ff6347;
    text-shadow: 1px 1px 2px rgba(139, 69, 19, 0.5);
    box-shadow: 0px 4px 8px rgba(255, 99, 71, 0.3);
}

.tool-btn.clear-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #ff6b6b, #ff4757);
    color: #fff;
    border-color: #ff3742;
    position: relative;
}

.tool-btn.clear-btn .el-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    position: static;
    width: 100%;
    height: 1.5em;
}

.tool-btn.clear-btn span {
    display: block;
    width: 100%;
    text-align: center;
    margin: 0;
    padding: 0;
}

.tool-btn:hover {
    background: linear-gradient(135deg, #ffb347, #ffd700);
    transform: translateY(-1px);
    box-shadow: 0px 3px 6px rgba(255, 140, 66, 0.3);
    border-color: #ff8c42;
}

.tool-btn:active {
    transform: translateY(0);
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
}

.tool-btn.active {
    background: linear-gradient(135deg, #ff8c42, #ff6347);
    color: #fff;
    border-color: #ff6347;
    text-shadow: 1px 1px 2px rgba(139, 69, 19, 0.5);
    box-shadow: 0px 4px 8px rgba(255, 99, 71, 0.3);
}

.tool-btn.clear-btn {
    background: linear-gradient(135deg, #ff6b6b, #ff4757);
    color: #fff;
    border-color: #ff3742;
}

.tool-btn.clear-btn:hover {
    background: linear-gradient(135deg, #ff4757, #ff3742);
    border-color: #ff2d3a;
}

.tool-btn .el-icon {
    font-size: 1.2rem;
    font-weight: 800;
}

/* 橡皮擦设置样式 */
.eraser-settings {
    margin-top: 10px;
    padding: 8px 12px;
    background: rgba(255, 255, 255, 0.3);
    border: 2px solid #f7a985;
    border-radius: 10px;
    box-shadow: inset 0px 1px 2px rgba(0, 0, 0, 0.1);
}

.eraser-size-control {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #8b4513;
    font-weight: 600;
}

.eraser-size-control label {
    font-size: 0.8rem;
    text-shadow: 1px 1px 0px rgba(255, 255, 255, 0.5);
    white-space: nowrap;
}

.eraser-slider {
    flex: 1;
    height: 6px;
    background: linear-gradient(90deg, #f7a985, #ff8c42);
    border-radius: 3px;
    outline: none;
    cursor: pointer;
    -webkit-appearance: none;
    appearance: none;
}

.eraser-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    background: linear-gradient(135deg, #fff8dc, #ffd700);
    border: 2px solid #ff8c42;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
    transition: all 0.2s ease;
}

.eraser-slider::-webkit-slider-thumb:hover {
    background: linear-gradient(135deg, #ffd700, #ffb347);
    transform: scale(1.1);
}

.eraser-slider::-moz-range-thumb {
    width: 16px;
    height: 16px;
    background: linear-gradient(135deg, #fff8dc, #ffd700);
    border: 2px solid #ff8c42;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
    transition: all 0.2s ease;
}

.eraser-settings .size-display {
    font-size: 0.8rem;
    color: #ff6347;
    font-weight: 800;
    text-shadow: 1px 1px 0px rgba(255, 255, 255, 0.5);
    min-width: 30px;
    text-align: center;
}

/* 画布容器样式 */
.canvas-container {
    position: relative;
    flex: 1;
    min-height: 500px;
    background: #ffffff;
    border: 4px solid #f7a985;
    border-radius: 20px;
    box-shadow:
        inset 0px 2px 4px rgba(0, 0, 0, 0.1),
        0px 4px 8px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    touch-action: none;
    /* 防止触摸滚动 */
}

.drawing-canvas {
    width: 100%;
    height: 100%;
    cursor: crosshair;
    display: block;
    touch-action: none;
    /* 防止触摸滚动 */
}

.drawing-canvas:active {
    cursor: grabbing;
}

.canvas-hint {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    color: #cd853f;
    pointer-events: none;
    z-index: 1;
}

.hint-icon {
    font-size: 4rem;
    color: #f7a985;
    text-shadow: 2px 2px 0px #ffd700;
    animation: iconBounce 3s ease-in-out infinite;
}

.hint-text {
    font-size: 1.4rem;
    text-shadow: 1px 1px 0px rgba(255, 255, 255, 0.5);
    font-weight: 600;
    text-align: center;
}

.hint-subtext {
    font-size: 1.1rem;
    text-shadow: 1px 1px 0px rgba(255, 255, 255, 0.5);
    opacity: 0.8;
    text-align: center;
}

/* 提示词输入区域样式 */
.prompt-section {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.prompt-inputs {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.input-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

/* PC端描述创作区域内的输入组样式（仅在PC端生效） */
@media (min-width: 1001px) {
    .description-section .input-group {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    /* 让前两个输入组（物体描述和颜色描述）平均分配空间 */
    .description-section .input-group:nth-child(1),
    .description-section .input-group:nth-child(2) {
        flex: 1;
    }

    /* 风格选择保持固定高度 */
    .description-section .input-group:nth-child(3) {
        flex: 0 0 auto;
    }

    .description-section .input-group .prompt-textarea {
        flex: 1; /* 让文本框占据剩余空间 */
        min-height: 80px; /* 最小高度 */
        resize: none; /* 禁用手动调整大小 */
    }
}

.input-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.input-header label {
    color: #8b4513;
    font-size: 1.2rem;
    text-shadow: 1px 1px 0px #ffd700;
    letter-spacing: 0.5px;
    font-weight: 600;
}

.input-controls {
    display: flex;
    align-items: center;
    gap: 12px;
}

.voice-input-btn {
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

.voice-input-btn:hover {
    background: linear-gradient(135deg, #ffb347, #ffd700);
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
}

.voice-input-btn:active {
    transform: translateY(0) scale(0.98);
}

.voice-input-btn.recording {
    background: linear-gradient(135deg, #ff6347, #ff4500);
    animation: voiceButtonPulse 1s ease-in-out infinite;
    box-shadow:
        0 3px 6px rgba(0, 0, 0, 0.2),
        0 0 20px rgba(255, 99, 71, 0.6);
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

    0%,
    100% {
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
    margin-right: 10px;
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

.prompt-textarea {
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
    min-height: 50px;
    max-height: 100px;
    overflow-y: auto;
}

.prompt-textarea:focus {
    border-color: #ffb347;
    box-shadow: 0 0 0 4px #ffe4b5, 0 2px 6px #ffd700;
    outline: none;
    background: #fff8dc;
}

.prompt-textarea::placeholder {
    color: #cd853f;
    line-height: 1.6;
}

.prompt-footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.word-count {
    color: #8b4513;
    font-size: 0.9rem;
    text-shadow: 1px 1px 0px rgba(255, 255, 255, 0.5);
    opacity: 0.8;
}



/* 生成按钮包装器 */
.generate-btn-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
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

/* 图片预览区域 */
.image-preview {
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
    min-height: 500px;
    aspect-ratio: 1;
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
    position: relative;
    overflow: hidden;
}

.preview-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 15px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
    transition: transform 0.3s ease;
}

.preview-image img:hover {
    transform: scale(1.02);
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

    0%,
    100% {
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

    0%,
    100% {
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

    0%,
    100% {
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
@media (max-width: 1400px) {
    .main-content {
        grid-template-columns: 1fr 1fr 1fr; /* 中等屏幕仍保持等宽 */
        max-width: 1200px;
        gap: 20px;
    }
}

/* 平板设备：两列布局，但保持独立的提示词区域 */
@media (max-width: 1000px) {
    .main-content {
        grid-template-columns: 1fr; /* 改为单列，但顺序是绘画->提示词->输出 */
        gap: 20px;
        max-width: 100%;
    }

    .drawing-section,
    .description-section,
    .output-section {
        min-height: auto; /* 平板端移除最小高度限制 */
    }

    .description-section {
        display: flex !important; /* 显示独立的提示词区域 */
        justify-content: normal; /* 重置PC端的布局 */
    }

    .description-section .prompt-inputs {
        flex: none; /* 重置PC端的flex设置 */
        margin-bottom: 20px; /* 恢复正常间距 */
    }

    .description-section .generate-btn-wrapper {
        margin-top: 0; /* 重置PC端的margin-top */
    }

    .mobile-prompt-section {
        display: none !important; /* 隐藏绘画区域内的提示词 */
    }
}

@media (max-width: 768px) {
    .stick-color {
        padding: 10px;
        font-size: 14px;
    }

    .main-content {
        grid-template-columns: 1fr; /* 移动端单列布局 */
        gap: 20px;
        max-width: 100%;
    }

    .drawing-section,
    .description-section,
    .output-section {
        min-height: auto; /* 移动端移除最小高度限制 */
    }

    /* 小屏移动端隐藏中间的独立提示词区域 */
    .description-section {
        display: none !important;
    }

    /* 小屏移动端显示绘画区域内的提示词区域 */
    .mobile-prompt-section {
        display: flex !important;
        flex-direction: column;
        gap: 20px;
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

    .drawing-section,
    .description-section,
    .output-section {
        border-width: 4px;
        box-shadow: 0px 6px #ff6347;
        padding: 20px;
    }

    .drawing-toolbar {
        flex-direction: column;
        gap: 15px;
        align-items: stretch;
    }

    .tool-group {
        justify-content: center;
    }

    .eraser-settings {
        margin-top: 8px;
        padding: 6px 10px;
    }

    .eraser-size-control {
        gap: 6px;
    }

    .eraser-size-control label {
        font-size: 0.75rem;
    }

    .eraser-slider {
        height: 5px;
    }

    .eraser-slider::-webkit-slider-thumb {
        width: 14px;
        height: 14px;
    }

    .eraser-settings .size-display {
        font-size: 0.75rem;
        min-width: 25px;
    }

    .canvas-container {
        min-height: 550px;
    }

    .image-preview {
        min-height: 400px;
        aspect-ratio: 1;
    }

    .prompt-controls {
        gap: 8px;
    }

    .voice-input-btn {
        width: 35px;
        height: 35px;
        border-width: 2px;
    }

    .clear-btn {
        font-size: 0.8rem;
        padding: 0.4em 0.8em;
        height: 30px;
    }

    .prompt-textarea {
        font-size: 0.9rem;
        padding: 0.8em 1em;
        min-height: 80px;
        max-height: 150px;
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

    .canvas-container {
        min-height: 450px;
    }

    .image-preview {
        min-height: 350px;
        aspect-ratio: 1;
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

:deep(.el-icon) {
    font-weight: 800;
}

/* 自定义下拉选择器样式 */
.custom-select-wrapper {
    position: relative;
    width: 100%;
}

.custom-select {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1em 1.2em;
    background: #fff8dc;
    border: 4px solid #f7a985;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.2s ease;
    color: #8b4513;
    font-size: 1rem;
    letter-spacing: 0.5px;
    box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.1);
    user-select: none;
}

.custom-select:hover {
    border-color: #ffb347;
    background: #fffacd;
}

.custom-select.is-open {
    border-color: #ff8c42;
    box-shadow: 0 0 0 4px #ffe4b5, 0 2px 6px #ffd700;
}

.select-display {
    flex: 1;
    text-align: left;
}

.select-arrow {
    margin-left: 10px;
    color: #8b4513;
    transition: transform 0.2s ease;
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
    border: 4px solid #f7a985;
    border-top: none;
    border-radius: 0 0 20px 20px;
    max-height: 200px;
    overflow-y: auto;
    z-index: 1000;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.select-option {
    padding: 0.8em 1.2em;
    cursor: pointer;
    transition: all 0.2s ease;
    color: #8b4513;
    font-size: 1rem;
    letter-spacing: 0.5px;
    border-bottom: 1px solid rgba(247, 169, 133, 0.3);
}

.select-option:hover {
    background: #ffe4b5;
    color: #ff6347;
}

.select-option.is-selected {
    background: #ffb347;
    color: #8b4513;
    font-weight: 600;
}
</style>
