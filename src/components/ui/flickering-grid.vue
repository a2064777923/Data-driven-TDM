<template>
  <canvas 
    ref="canvasRef" 
    :class="`size-full pointer-events-none ${className}`" 
    :style="{ width: width || '100%', height: height || '100%'}"
    :width="width"
    :height="height"
  />
</template>

<script setup>
import { onMounted, onUnmounted, ref, computed, watch, reactive } from 'vue';

// 定义组件Props
const props = defineProps({
  squareSize: { type: Number, default: 4 },
  gridGap: { type: Number, default: 6 },
  flickerChance: { type: Number, default: 0.3 },
  color: { type: String, default: 'rgb(0, 0, 0)' },
  width: Number,
  height: Number,
  className: String,
  maxOpacity: { type: Number, default: 0.3 }
});

// 创建ref和reactive
const canvasRef = ref(null);
let isInView = ref(false);

const memoizedColor = computed(() => {
  const toRGBA = (color) => {
    if (typeof window === 'undefined') {
      return 'rgba(0, 0, 0,';
    }
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 1;
    const ctx = canvas.getContext('2d');
    if (!ctx) return 'rgba(255, 0, 0,';
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
    return `rgba(${r}, ${g}, ${b},`;
  };
  return toRGBA(props.color);
});

const setupCanvas = (canvas) => {
  const canvasWidth = props.width || canvas.clientWidth;
  const canvasHeight = props.height || canvas.clientHeight;
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvasWidth * dpr;
  canvas.height = canvasHeight * dpr;
  canvas.style.width = `${canvasWidth}px`;
  canvas.style.height = `${canvasHeight}px`;
  const cols = Math.floor(canvasWidth / (props.squareSize + props.gridGap));
  const rows = Math.floor(canvasHeight / (props.squareSize + props.gridGap));

  const squares = new Float32Array(cols * rows);
  for (let i = 0; i < squares.length; i++) {
    squares[i] = Math.random() * props.maxOpacity;
  }

  return {
    width: canvasWidth,
    height: canvasHeight,
    cols,
    rows,
    squares,
    dpr,
  };
};

const updateSquares = (squares, deltaTime) => {
  for (let i = 0; i < squares.length; i++) {
    if (Math.random() < props.flickerChance * deltaTime) {
      squares[i] = Math.random() * props.maxOpacity;
    }
  }
};

const drawGrid = (ctx, width, height, cols, rows, squares, dpr) => {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = 'transparent';
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const opacity = squares[i * rows + j];
      ctx.fillStyle = `${memoizedColor.value}${opacity})`;
      ctx.fillRect(
        i * (props.squareSize + props.gridGap) * dpr,
        j * (props.squareSize + props.gridGap) * dpr,
        props.squareSize * dpr,
        props.squareSize * dpr
      );
    }
  }
};

onMounted(() => {
  const canvas = canvasRef.value;
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let animationFrameId;
  let { width, height, cols, rows, squares, dpr } = setupCanvas(canvas);

  let lastTime = 0;
  const animate = (time) => {
    if (!isInView.value) return;

    const deltaTime = (time - lastTime) / 1000;
    lastTime = time;

    updateSquares(squares, deltaTime);
    drawGrid(ctx, width * dpr, height * dpr, cols, rows, squares, dpr);
    animationFrameId = requestAnimationFrame(animate);
  };

  const handleResize = () => {
    ({ width, height, cols, rows, squares, dpr } = setupCanvas(canvas));
  };

  const observer = new IntersectionObserver(
    ([entry]) => {
      isInView.value = entry.isIntersecting;
    },
    { threshold: 0 }
  );

  observer.observe(canvas);

  window.addEventListener('resize', handleResize);

  watch(isInView, (newVal) => {
    if (newVal) {
      animationFrameId = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(animationFrameId);
    }
  });

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
    cancelAnimationFrame(animationFrameId);
    observer.disconnect();
  });
});
</script>

<style scoped>
.size-full {
  width: 100%;
  height: 100%;
}
.pointer-events-none {
  pointer-events: none;
}
</style>
