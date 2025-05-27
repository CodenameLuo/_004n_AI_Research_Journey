<template>
  <div class="gallery">
    <div class="gallery-header">
      <h2>🎭 画廊</h2>
      <p>欣赏小朋友们创作的精彩故事图片！</p>
      <!-- 搜索框 -->
      <div class="search-box">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="搜索姓名或风格..." 
          class="search-input"
          @input="filterGallery"
        />
        <div class="search-icon">🔍</div>
      </div>
    </div>

    <!-- 加载状态 -->
    <div v-if="isLoading" class="loading-container">
      <el-skeleton :rows="3" animated />
    </div>

    <!-- 画廊内容 -->
    <div v-else class="gallery-waterfall">
      <div 
        v-for="(set, index) in filteredGallery" 
        :key="set.id"
        class="gallery-set"
      >
        <div class="set-info">
          <div class="set-meta">
            <h3>{{ set.userName }}的故事</h3>
            <span class="set-date">{{ set.createdAt }}</span>
          </div>
          <div class="set-style">{{ set.style }}</div>
        </div>
        <!-- 9宫格图片 -->
        <div class="images-grid-9">
          <div 
            v-for="(image, index) in set.images" 
            :key="index"
            class="image-item"
            @click="previewImage(image)"
          >
            <img :src="image" :alt="`图片${index + 1}`" />
            <div class="image-overlay">
              <el-icon class="preview-icon"><ZoomIn /></el-icon>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 空状态 -->
    <div v-if="!isLoading && filteredGallery.length === 0 && searchQuery" class="empty-state">
      <el-icon class="empty-icon"><Picture /></el-icon>
      <h3>没有找到相关内容</h3>
      <p>试试搜索其他关键词吧！</p>
    </div>
    
    <!-- 无数据状态 -->
    <div v-if="!isLoading && galleryImages.length === 0" class="empty-state">
      <el-icon class="empty-icon"><Picture /></el-icon>
      <h3>暂无故事</h3>
      <p>快来上面创作你的第一个故事吧！</p>
    </div>

    <!-- 图片预览对话框 -->
    <el-dialog
      v-model="isPreviewVisible"
      title="图片预览"
      width="50%"
      center
    >
      <div class="image-preview-container" v-if="selectedImage">
        <img :src="selectedImage" alt="预览" class="preview-image" />
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ZoomIn, Picture } from '@element-plus/icons-vue'

// 画廊图片数据
const galleryImages = ref([])
const filteredGallery = ref([])
const searchQuery = ref('')
const isLoading = ref(false)
const selectedImage = ref(null)
const isPreviewVisible = ref(false)

// 模拟历史数据
const mockHistoryData = [
  {
    id: 1,
    images: Array(9).fill(null).map((_, index) => 
      `https://picsum.photos/300/300?random=${1000 + index}`
    ),
    createdAt: '2024-01-15',
    userName: 'Alice',
    style: '卡通风格'
  },
  {
    id: 2,
    images: Array(9).fill(null).map((_, index) => 
      `https://picsum.photos/300/300?random=${2000 + index}`
    ),
    createdAt: '2024-01-14',
    userName: 'Bob',
    style: '动漫风格'
  },
  {
    id: 3,
    images: Array(9).fill(null).map((_, index) => 
      `https://picsum.photos/300/300?random=${3000 + index}`
    ),
    createdAt: '2024-01-13',
    userName: 'Charlie',
    style: '奇幻风格'
  },
  {
    id: 4,
    images: Array(9).fill(null).map((_, index) => 
      `https://picsum.photos/300/300?random=${4000 + index}`
    ),
    createdAt: '2024-01-12',
    userName: 'Daisy',
    style: '水彩风格'
  },
  {
    id: 5,
    images: Array(9).fill(null).map((_, index) => 
      `https://picsum.photos/300/300?random=${5000 + index}`
    ),
    createdAt: '2024-01-11',
    userName: 'Emma',
    style: '油画风格'
  },
  {
    id: 6,
    images: Array(9).fill(null).map((_, index) => 
      `https://picsum.photos/300/300?random=${6000 + index}`
    ),
    createdAt: '2024-01-10',
    userName: 'Frank',
    style: '卡通风格'
  },
  {
    id: 7,
    images: Array(9).fill(null).map((_, index) => 
      `https://picsum.photos/300/300?random=${7000 + index}`
    ),
    createdAt: '2024-01-09',
    userName: 'Grace',
    style: '写实风格'
  },
  {
    id: 8,
    images: Array(9).fill(null).map((_, index) => 
      `https://picsum.photos/300/300?random=${8000 + index}`
    ),
    createdAt: '2024-01-08',
    userName: 'Henry',
    style: '动漫风格'
  }
]

// 加载画廊数据
const loadGalleryData = async () => {
  isLoading.value = true
  try {
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1000))
    galleryImages.value = mockHistoryData
    filteredGallery.value = galleryImages.value
  } catch (error) {
    console.error('加载画廊数据失败:', error)
  } finally {
    isLoading.value = false
  }
}

// 搜索过滤功能
const filterGallery = () => {
  if (!searchQuery.value.trim()) {
    filteredGallery.value = galleryImages.value
    return
  }
  
  const query = searchQuery.value.toLowerCase()
  filteredGallery.value = galleryImages.value.filter(item => 
    item.userName.toLowerCase().includes(query) || 
    item.style.toLowerCase().includes(query)
  )
}

// 预览图片
const previewImage = (image) => {
  selectedImage.value = image
  isPreviewVisible.value = true
}

// 下载图片集
const downloadImageSet = (images, setId) => {
  images.forEach((url, index) => {
    const link = document.createElement('a')
    link.href = url
    link.download = `画廊_${setId}_${index + 1}.jpg`
    link.click()
  })
}

onMounted(() => {
  loadGalleryData()
})
</script>

<style scoped>
/* 全局字体设置 - 使用本地64_fonts.ttf字体与主页面保持一致 */
.gallery {
  background: #fff8dc;
  border-radius: 25px;
  padding: 30px;
  border: 6px solid #f7a985;
  box-shadow: 0px 10px #ff6347;
  max-width: 1800px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  /* 统一使用本地可爱字体：64_fonts.ttf */
  font-family: 'CuteFont64', 'Comic Sans MS', 'Microsoft YaHei', '微软雅黑', cursive, sans-serif;
  font-size: 16px;
  line-height: 1.8;
  font-weight: 400;
}

/* Gallery 内部动态装饰 */
.gallery::before {
  content: '';
  position: absolute;
  top: -50px;
  right: -50px;
  width: 100px;
  height: 100px;
  background: radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, transparent 70%);
  border-radius: 50%;
  animation: galleryGlow 4s ease-in-out infinite alternate;
  pointer-events: none;
}

.gallery::after {
  content: '';
  position: absolute;
  bottom: -30px;
  left: -30px;
  width: 80px;
  height: 80px;
  background: radial-gradient(circle, rgba(255, 182, 193, 0.3) 0%, transparent 70%);
  border-radius: 50%;
  animation: galleryGlow 5s ease-in-out infinite alternate reverse;
  pointer-events: none;
}

@keyframes galleryGlow {
  0% {
    transform: scale(1) rotate(0deg);
    opacity: 0.3;
  }
  100% {
    transform: scale(1.5) rotate(180deg);
    opacity: 0.6;
  }
}

/* 全局字体继承 */
.gallery *,
.gallery *::before,
.gallery *::after {
  font-family: inherit;
  font-weight: inherit;
}

.gallery-header {
  text-align: center;
  margin-bottom: 20px;
}

.gallery-header h2 {
  color: #8b4513;
  font-size: 2.6rem;
  margin: 0 0 10px 0;
  font-weight: 400;
  text-shadow: 2px 2px 0px #ffd700;
  letter-spacing: 3px;
  font-family: 'CuteFont64', cursive;
}

.gallery-header p {
  color: #8b4513;
  font-size: 1.3rem;
  margin: 0 0 20px 0;
  font-weight: 500;
  text-shadow: 1px 1px 0px #ffd700;
  letter-spacing: 2px;
  font-family: 'CuteFont64', cursive;
}

/* 搜索框样式 */
.search-box {
  position: relative;
  max-width: 400px;
  margin: 0 auto;
}

.search-input {
  width: 100%;
  padding: 12px 50px 12px 20px;
  border: 4px solid #f7a985;
  border-radius: 25px;
  background: #fff8dc;
  color: #8b4513;
  font-size: 1.1rem;
  font-weight: 700;
  outline: none;
  transition: all 0.3s ease;
  letter-spacing: 0.5px;
  box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.search-input:focus {
  border-color: #ffb347;
  background: #fffacd;
  box-shadow: 0 0 0 4px #ffe4b5, 0 2px 6px #ffd700;
}

.search-input::placeholder {
  color: #cd853f;
  font-weight: 600;
}

.search-icon {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.2rem;
  color: #ff8c42;
  pointer-events: none;
}

.loading-container {
  padding: 20px 0;
}

.gallery-waterfall {
  column-count: 3;
  column-gap: 25px;
  column-fill: balance;
}

.gallery-set {
  border: 4px solid #f7a985;
  border-radius: 20px;
  padding: 20px;
  background: #fffacd;
  transition: all 0.3s cubic-bezier(.4,2,.6,1);
  box-shadow: 0px 6px #ff6347;
  margin-bottom: 25px;
  break-inside: avoid;
  page-break-inside: avoid;
  -webkit-column-break-inside: avoid;
  position: relative;
  animation: galleryCardFloat 6s ease-in-out infinite;
}

.gallery-set:nth-child(even) {
  animation-delay: -3s;
}

.gallery-set:nth-child(3n) {
  animation-delay: -1.5s;
}


.gallery-set:hover::before {
  opacity: 0.7;
}

@keyframes galleryCardFloat {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  25% {
    transform: translateY(-2px) rotate(0.5deg);
  }
  50% {
    transform: translateY(0px) rotate(0deg);
  }
  75% {
    transform: translateY(-1px) rotate(-0.5deg);
  }
}

@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.set-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 15px;
}

.set-meta h3 {
  color: #8b4513;
  margin: 0 0 5px 0;
  font-size: 1.4rem;
  font-weight: 800;
  text-shadow: 1px 1px 0px #ffd700;
  letter-spacing: 0.5px;
}

.set-date {
  color: #cd853f;
  font-size: 1rem;
  font-weight: 700;
}

.set-style {
  background: #ff8c42;
  color: #fff;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 1rem;
  font-weight: 800;
  border: 3px solid #f7a985;
  box-shadow: 0px 3px #ff6347;
  text-shadow: 1px 1px 0px #d2691e;
  letter-spacing: 0.5px;
}

.images-grid-9 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 8px;
  margin-top: 10px;
}

.image-item {
  position: relative;
  aspect-ratio: 1;
  border-radius: 15px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.15s cubic-bezier(.4,2,.6,1);
  background: #fff;
  border: 3px solid #f7a985;
  box-shadow: 0px 3px #ff6347;
}

.image-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 140, 66, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.image-item:hover .image-overlay {
  opacity: 1;
}

.preview-icon {
  color: #fff;
  font-size: 2.2rem;
  filter: drop-shadow(0 2px 0 #ff6347);
  font-weight: 800;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #8b4513;
}

.empty-icon {
  font-size: 4.5rem;
  color: #ff8c42;
  margin-bottom: 20px;
  filter: drop-shadow(0 2px 0 #ffd700);
}

.empty-state h3 {
  font-size: 1.8rem;
  margin: 0 0 10px 0;
  font-weight: 800;
  text-shadow: 1px 1px 0px #ffd700;
  letter-spacing: 0.5px;
}

.empty-state p {
  font-size: 1.2rem;
  margin: 0;
  font-weight: 700;
  text-shadow: 1px 1px 0px #ffd700;
  letter-spacing: 0.5px;
}

.image-preview-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
}

.preview-image {
  max-width: 100%;
  max-height: 500px;
  border-radius: 15px;
  border: 4px solid #f7a985;
  box-shadow: 0px 8px #ff6347;
}

@media (max-width: 1600px) {
  .gallery {
    max-width: 1400px;
  }
}

@media (max-width: 1400px) {
  .gallery {
    max-width: 1200px;
  }
}

@media (max-width: 1200px) {
  .gallery-waterfall {
    column-count: 2;
    column-gap: 20px;
  }
}

@media (max-width: 900px) {
  .gallery-waterfall {
    column-count: 1;
    column-gap: 0;
  }
  
  .search-box {
    max-width: 100%;
  }
}
@media (max-width: 600px) {
  .images-grid-9 {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 4px;
  }
  .gallery {
    padding: 20px;
    border-width: 4px;
    box-shadow: 0px 6px #ff6347;
    font-size: 14px;
  }
  .gallery-set {
    border-width: 3px;
    box-shadow: 0px 4px #ff6347;
  }
  .image-item {
    border-width: 2px;
    box-shadow: 0px 2px #ff6347;
  }
  .gallery-header h2 {
    font-size: 1.8rem;
  }
  .gallery-header p {
    font-size: 1.1rem;
  }
  .set-meta h3 {
    font-size: 1.2rem;
  }
}

/* Element Plus 组件字体统一覆盖 */
:deep(.el-skeleton) {
  font-weight: 700;
}

:deep(.el-dialog) {
  font-weight: 700;
}

:deep(.el-dialog__title) {
  font-size: 1.4rem;
  font-weight: 800;
  color: #8b4513;
  letter-spacing: 0.5px;
}

:deep(.el-icon) {
  font-weight: 800;
}
</style> 