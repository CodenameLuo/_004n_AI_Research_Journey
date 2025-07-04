<template>
    <div class="style-transfer">
        <!-- 头部标题，沿用统一装饰 -->
        <div class="header">
            <div class="title-container">
                <h1 class="title">
                    <span class="title-icon">🖼️</span>
                    <span class="title-text">风格迁移</span>
                </h1>
            </div>
        </div>

        <div class="main-content">
            <!-- 输入图片 -->
            <div class="upload-section">
                <div class="section-title">
                    <h2>📤 输入图片</h2>
                </div>
                <el-upload class="image-uploader" :show-file-list="false" :before-upload="handleImageUpload" accept=".jpg,.jpeg,.png" drag>
                    <div v-if="!inputPreview" class="upload-placeholder">
                        <el-icon class="upload-icon">
                            <Plus />
                        </el-icon>
                        <div class="upload-text">拖拽或点击上传图片</div>
                    </div>
                    <div v-else class="image-preview">
                        <img :src="inputPreview" alt="输入图片" />
                        <div class="image-overlay">
                            <el-button type="danger" size="small" @click.stop="removeImage">
                                <el-icon>
                                    <Delete />
                                </el-icon>
                            </el-button>
                        </div>
                    </div>
                </el-upload>

                <!-- 风格选择 -->
                <div class="style-select">
                    <label>请选择风格</label>
                    <el-select v-model="selectedStyle" placeholder="选择风格" class="custom-select">
                        <el-option v-for="opt in styleOptions" :key="opt.value" :label="opt.label" :value="opt.value" />
                    </el-select>
                </div>

                <div class="generate-btn-wrapper">
                    <el-button type="primary" :disabled="!canGenerate" :loading="isGenerating" @click="generate">
                        <el-icon>
                            <MagicStick />
                        </el-icon>
                        {{ isGenerating ? '生成中...' : '开始迁移' }}
                    </el-button>
                    <div v-if="isGenerating" style="display:flex;align-items:center;margin-left:10px">
                        <span v-if="statusText" style="margin-right:8px;color:#8b4513">{{ statusText }}</span>
                        <el-progress v-if="progress > 0" :percentage="progress" :stroke-width="14" style="width:180px" />
                    </div>
                </div>
            </div>

            <!-- 输出图片 -->
            <div class="output-section">
                <div class="section-title">
                    <h2>🖼️ 输出图片</h2>
                </div>
                <div class="output-corner-actions" v-if="outputImage">
                    <div class="corner-button download-btn" @click="download" title="下载图片">
                        <el-icon>
                            <Download />
                        </el-icon>
                    </div>
                </div>
                <div class="image-preview">
                    <div v-if="!outputImage" class="preview-placeholder">
                        <el-icon class="placeholder-icon">
                            <Picture />
                        </el-icon>
                        <div class="placeholder-text">生成后的图片将显示在此</div>
                    </div>
                    <div v-else class="preview-image"><img :src="outputImage" alt="输出图片" /></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Plus, Delete, MagicStick, Download, Picture } from '@element-plus/icons-vue'
import { ElProgress, ElMessage } from 'element-plus'

const API_BASE_URL = 'https://api.lingximoyu.com'
const API_KEY = 'sk-JdJqP2CyAUXtqGL36d25AaDa6e9b46868bF45d0a515d7882'

// 输入图片相关
const inputFile = ref(null)
const inputPreview = ref('')

// 输出图片
const outputImage = ref('')

// 风格选项
const styleOptions = [
    { label: '莫奈风', value: '莫奈风' },
    { label: '动画风', value: '动画风' },
    { label: '赛博朋克风', value: '赛博朋克风' },
    { label: '中国风', value: '中国风' },
    { label: '皮克斯风', value: '皮克斯风' },
    { label: '机甲风', value: '机甲风' },
]
const selectedStyle = ref('')

// 生成状态
const isGenerating = ref(false)
const progress = ref(0)
const statusText = ref('预处理中...')

const canGenerate = computed(() => inputFile.value && selectedStyle.value)

// 处理图片上传
const handleImageUpload = (file) => {
    if (!validateImage(file)) return false
    inputFile.value = file
    const reader = new FileReader()
    reader.onload = (e) => {
        inputPreview.value = e.target.result
    }
    reader.readAsDataURL(file)
    return false
}

const validateImage = (file) => {
    const isImg = ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)
    const isLt10M = file.size / 1024 / 1024 < 10
    return isImg && isLt10M
}

const removeImage = () => {
    inputFile.value = null
    inputPreview.value = ''
    outputImage.value = ''
}

// 生成风格迁移结果
const generate = async () => {
    if (!canGenerate.value) return
    isGenerating.value = true
    progress.value = 0
    statusText.value = '预处理中...'
    try {
        // 将文件转为base64
        const { base64, width: imgW, height: imgH } = await compressImage(inputFile.value)
        const prompt = `将这张图片转换成${selectedStyle.value}，输出尺寸${imgW}x${imgH}`

        const body = {
            model: 'gpt-4o-image',
            stream: true,
            messages: [
                {
                    role: 'user',
                    content: [
                        { type: 'text', text: prompt },
                        { type: 'image_url', image_url: { url: base64 } },
                    ],
                },
            ],
        }

        const res = await fetch(`/lingxi/v1/chat/completions`, {
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
                    progress.value = 100
                    break
                }
                try {
                    const json = JSON.parse(payload)
                    const contentDelta = json.choices?.[0]?.delta?.content || ''
                    accumulated += contentDelta

                    // 队列/预处理提示
                    if (contentDelta.includes('任务正在队列中')) {
                        statusText.value = '排队中...'
                    }

                    const pctMatch = contentDelta.match(/进度：([\d.]+)%/)
                    if (pctMatch) {
                        statusText.value = ''
                        progress.value = Math.min(99, parseFloat(pctMatch[1]).toFixed(1))
                    }

                    if (contentDelta.includes('图片绘制成功')) {
                        statusText.value = '生成成功'
                        ElMessage.success('图片风格转换成功！')
                    }

                    // Fallback：仍然用 chunk 数来估算，避免长时间0%
                    if (!pctMatch) {
                        chunkCount++
                        if (chunkCount % 10 === 0 && progress.value < 90) {
                            progress.value += 1
                        }
                    }

                    // 尝试在增量中解析 URL
                    const urlMatch = accumulated.match(/https?:[^\s)]+/)
                    if (urlMatch) {
                        outputImage.value = urlMatch[0]
                        progress.value = 100
                    }
                } catch (e) {
                    console.warn('解析流数据失败', e)
                }
            }
        }
    } catch (err) {
        console.error(err)
        alert(err.message)
    } finally {
        isGenerating.value = false
        // 若未成功获取图片，则复位进度；成功则保持100%
        if (!outputImage.value) progress.value = 0
    }
}

const download = () => {
    if (!outputImage.value) return
    const link = document.createElement('a')
    link.href = outputImage.value
    link.download = 'style_transfer.png'
    link.click()
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
</script>

<style scoped>
/* 复用整体配色和排版，简化样式： */
.style-transfer {
    min-height: 100vh;
    background: linear-gradient(135deg, #ffb347 0%, #ff8c42 100%);
    padding: 20px;
    font-family: 'CuteFont64', 'Comic Sans MS', 'Microsoft YaHei', cursive, sans-serif;
}

.header {
    text-align: center;
    margin-bottom: 20px;
}

.title {
    font-size: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    color: #2c1810;
}

.main-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
}

.section-title h2 {
    margin: 0 0 10px 0;
    color: #8b4513;
}

.upload-section,
.output-section {
    background: #fff8dc;
    border-radius: 20px;
    padding: 20px;
    border: 4px solid #f7a985;
    box-shadow: 0 6px #ff6347;
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.image-preview {
    position: relative;
    width: 100%;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}

.image-preview img {
    max-width: 100%;
    max-height: 100%;
    border-radius: 10px;
    border: 4px solid #f7a985;
}

.upload-placeholder {
    color: #8b4513;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 200px;
}

.upload-icon {
    font-size: 3rem;
    color: #ff8c42;
}

.generate-btn-wrapper {
    display: flex;
    justify-content: center;
}

.corner-button {
    cursor: pointer;
}

.preview-placeholder {
    text-align: center;
    color: #8b4513;
}

.placeholder-icon {
    font-size: 3rem;
    color: #ff8c42;
}
</style>