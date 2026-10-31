import fs from 'fs';
import path from 'path';

const SRC_DATA_DIR = path.resolve(process.cwd(), 'src/data');

const PINNED_REPOS = [
  'GateKeeper',
  'Serverless-pastebin',
  'Receipt',
  'Flash-Atten2-MMA',
  'Triton-MLOps',
  'Custom-HGEMM',
  'Semantic-search-RAG',
  'Cortexion',
  'Awaaz',
  'microgpt',
  'bootloader-for-arduino',
  'Http-flood-detector',
  'Satellite-Vulnerability-Mapper',
  'IoT-based-Air-Quality-Safety-Monitoring-System',
  'Chua-s-circuit-simulation',
  'compressor'
];

const EXCLUDED_REPOS = new Set([
  'Paramveersingh-S',
  'aes',
  'semantic-router',
  'vllm-ascend',
  'neetcode-submissions-s1rouzr3'
]);

const CURATED_METADATA = {
  'GateKeeper': {
    category: 'Cloud & Distributed Systems',
    language: 'Python',
    badge: '>5,000 RPS // <10ms p50',
    metrics: ['5,000+ RPS', '<10ms p50', '38.4% Cache Hit', 'Atomic Lua Redis'],
    excerpt: 'Distributed LLM API Gateway & token-aware rate limiter with atomic Redis Lua scripts, multi-provider circuit-breaker failover, and FAISS semantic caching.'
  },
  'Serverless-pastebin': {
    category: 'Cloud & DevSecOps',
    language: 'HCL',
    badge: 'AWS + TERRAFORM IaC',
    metrics: ['Terraform IaC', 'AWS Lambda', 'DynamoDB TTL', 'KMS + WAFv2'],
    excerpt: 'Zero-trust serverless pastebin on AWS provisioned with modular Terraform: API Gateway, Lambda (Python 3.12), DynamoDB TTL, KMS S3 presigned URLs, and CloudWatch alarms.'
  },
  'Receipt': {
    category: 'Full-Stack & Cloud',
    language: 'TypeScript',
    badge: 'FULL-STACK + RBAC + DOCKER',
    metrics: ['React 18 + TS', 'PostgreSQL 16', 'Celery + Redis', 'JWT RBAC'],
    excerpt: 'Full-stack AI financial receipt intelligence platform with React/TypeScript dashboard, FastAPI async backend, Celery OCR workers, PostgreSQL 16, and Docker Compose.'
  },
  'Flash-Atten2-MMA': {
    category: 'GPU & CUDA Kernels',
    language: 'CUDA',
    badge: '87.5% TENSOR CORE PEAK',
    metrics: ['PTX mma.sync', '2.15x vs PyTorch', 'Zero HBM Spill', 'FP16/BF16'],
    excerpt: 'Bare-metal FlashAttention-2 forward/backward pass in CUDA C++ and PTX inline assembly using warp-level matrix multiply-accumulate and async cp.async staging.'
  },
  'Triton-MLOps': {
    category: 'Cloud & AI Infrastructure',
    language: 'Python',
    badge: '96.3% TTFT REDUCTION',
    metrics: ['120ms -> 4.4ms TTFT', '3.7x Throughput', 'Kubernetes HPA', 'Prometheus'],
    excerpt: 'Production LLM inference engine with custom OpenAI Triton fused kernels (RMSNorm, RoPE, SwiGLU, INT8 KV-cache), dynamic continuous batching, and Kubernetes autoscaling.'
  },
  'Custom-HGEMM': {
    category: 'GPU & CUDA Kernels',
    language: 'CUDA',
    badge: '14.0x SPEEDUP // 94.2% cuBLAS',
    metrics: ['14.0x Speedup', '94.2% cuBLAS', 'Bank-Conflict Free', 'Double Buffered'],
    excerpt: '7-stage progressive Half-Precision Matrix Multiplication (HGEMM) in CUDA C++ exploiting Tensor Core WMMA/MMA instructions, vectorized 128-bit loads, and shared memoryizzling.'
  },
  'Semantic-search-RAG': {
    category: 'Cloud & Distributed Systems',
    language: 'Python',
    badge: 'SUB-100ms HYBRID RAG',
    metrics: ['BM25 + SPLADE v2', '<100ms Latency', 'Qdrant HNSW', 'Distributed'],
    excerpt: 'Distributed microservices platform for enterprise hybrid search combining BM25, dense embeddings, and custom SPLADE v2 sparse expansion with sub-100ms answer synthesis.'
  },
  'Cortexion': {
    category: 'AI & Edge Systems',
    language: 'Python',
    badge: 'INDIA INNOVATES FINALIST',
    metrics: ['<45ms BCI Latency', 'EEG Motor Imagery', 'ONNX Runtime', 'WebSockets'],
    excerpt: 'Real-time non-invasive Brain-Computer Interface translating raw multi-channel EEG waves into robotic control commands in <45ms via spatial-spectral neural networks.'
  },
  'Awaaz': {
    category: 'Full-Stack & Cloud',
    language: 'Python',
    badge: 'MULTILINGUAL VOICE AI',
    metrics: ['Streaming ASR', 'FastAPI + React', 'Low-Resource NLP', 'Sub-300ms'],
    excerpt: 'Full-stack multilingual voice intelligence and accessibility platform supporting real-time Indic speech transcription, semantic intent routing, and neural TTS.'
  },
  'microgpt': {
    category: 'AI & GPU Compute',
    language: 'Python',
    badge: 'DISTRIBUTED DDP + FLASH',
    metrics: ['PyTorch DDP', 'BF16 Mixed Precision', 'RoPE + SwiGLU', 'Chinchilla Scaling'],
    excerpt: 'Minimalist high-efficiency pre-training framework for GPT/Llama decoder transformers featuring DistributedDataParallel, FlashAttention, and cosine warmup schedulers.'
  },
  'bootloader-for-arduino': {
    category: 'Systems & Embedded',
    language: 'C',
    badge: '512-BYTE AVR BOOTLOADER',
    metrics: ['<512B Flash', 'STK500v1 UART', 'Hardware Watchdog', 'AVR Assembly'],
    excerpt: 'Custom bare-metal 512-byte bootloader in AVR C and Assembly for ATmega328P supporting UART firmware flashing, CRC-16 validation, and watchdog recovery.'
  },
  'Http-flood-detector': {
    category: 'Cloud & DevSecOps',
    language: 'C++',
    badge: 'LINE-RATE DDoS MITIGATION',
    metrics: ['eBPF / libpcap', 'Shannon Entropy', 'Sliding Window', 'Zero-Copy'],
    excerpt: 'High-speed L7 HTTP flood & DDoS anomaly detector inspecting packet streams with sliding-window Shannon entropy and automatic IPables/XDP mitigation rules.'
  },
  'Satellite-Vulnerability-Mapper': {
    category: 'Cloud & DevSecOps',
    language: 'Python',
    badge: 'NASA SPACE APPS NOMINEE',
    metrics: ['SGP4 Orbital Prop', '3D WebGL Globe', 'RF Link Audit', 'CVE Telemetry'],
    excerpt: 'Orbital security & telemetry visualizer tracking active satellites via TLE/SGP4 propagation, mapping ground-station RF exposure windows and firmware CVEs.'
  },
  'IoT-based-Air-Quality-Safety-Monitoring-System': {
    category: 'Systems & Embedded',
    language: 'C++',
    badge: 'EDGE TELEMETRY + CLOUD',
    metrics: ['ESP8266 + AVR', 'MQTT Telemetry', 'Kalman Filtering', 'Real-Time Alerts'],
    excerpt: 'Distributed industrial gas & air-quality hazard telemetry node with sensor fusion, SD black-box logging, and low-latency cloud alerting.'
  },
  'Chua-s-circuit-simulation': {
    category: 'Systems & Embedded',
    language: 'Python',
    badge: 'IEEE HYPERCHAOS RESEARCH',
    metrics: ['4th-Order Runge-Kutta', 'Lyapunov Exponents', 'Double-Scroll', 'NIST Entropy'],
    excerpt: 'Numerical simulation and bifurcation visualizer for nonlinear hyperchaotic Chua oscillators underpinning hardware cryptographic True Random Number Generators.'
  },
  'compressor': {
    category: 'Systems & Embedded',
    language: 'C++',
    badge: 'LOSSLESS BITSTREAM ENGINE',
    metrics: ['LZ77 + Huffman', 'Bit-Level I/O', 'Zero External Deps', 'CLI Tool'],
    excerpt: 'High-speed lossless file compression engine in modern C++ combining sliding-window LZ77 dictionary matching with canonical Huffman entropy coding.'
  }
};

async function fetchRepos() {
  const headers = {};
  if (process.env.GH_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.GH_TOKEN}`;
  }

  const res = await fetch('https://api.github.com/users/Paramveersingh-S/repos?per_page=100&sort=pushed', { headers });
  const data = await res.json();

  if (!Array.isArray(data)) {
    console.error("Failed to fetch repos:", data);
    return;
  }

  const notableRepos = data.filter(repo => !EXCLUDED_REPOS.has(repo.name) && (!repo.fork || PINNED_REPOS.includes(repo.name)));

  const reposResult = [];

  for (const repo of notableRepos) {
    const curated = CURATED_METADATA[repo.name] || {};
    let excerpt = curated.excerpt || repo.description || "Systems & AI engineering repository.";

    reposResult.push({
      name: repo.name,
      description: curated.excerpt || repo.description,
      html_url: repo.html_url,
      homepage: repo.homepage,
      language: curated.language || repo.language || 'Python',
      category: curated.category || (repo.language === 'C++' || repo.language === 'C' ? 'Systems & Embedded' : 'AI & GPU Compute'),
      badge: curated.badge || (repo.language ? `${repo.language.toUpperCase()} SYSTEM` : 'ENGINEERING'),
      metrics: curated.metrics || [repo.language || 'Code', 'Open Source'],
      topics: repo.topics || [],
      stargazers_count: Math.max(repo.stargazers_count || 0, 1),
      forks_count: repo.forks_count || 0,
      pushed_at: repo.pushed_at,
      excerpt,
      isPinned: PINNED_REPOS.includes(repo.name),
      pinOrder: PINNED_REPOS.indexOf(repo.name)
    });
  }

  // Sort pinned first in exact PINNED_REPOS order, then by pushed_at desc
  reposResult.sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    if (a.isPinned && b.isPinned) return a.pinOrder - b.pinOrder;
    return new Date(b.pushed_at) - new Date(a.pushed_at);
  });

  fs.writeFileSync(path.join(SRC_DATA_DIR, 'repos.json'), JSON.stringify(reposResult, null, 2));
  console.log(`fetchRepos complete. Saved ${reposResult.length} repos.`);
}

fetchRepos();
