import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiTerminal, HiPlay, HiCheckCircle } from 'react-icons/hi';

const BENCHMARKS = [
  {
    id: 'gatekeeper',
    cmd: 'bench --target gatekeeper --rps 5000',
    title: 'GateKeeper Distributed LLM Gateway',
    summary: 'Atomic Redis Lua token-bucket rate limiter + FAISS semantic cache.',
    bars: [
      { label: 'Standard Proxy p50 Latency', value: '48.0 ms', pct: 85, color: 'bg-slate-600' },
      { label: 'GateKeeper Atomic Lua p50', value: '8.4 ms (-82.5%)', pct: 16, color: 'bg-blue-500' },
      { label: 'Sustained Throughput', value: '5,240 RPS', pct: 96, color: 'bg-sky-400' }
    ],
    logs: [
      '[INFO] Initializing Redis Lua atomic token-bucket & sliding-window scripts...',
      '[INFO] FAISS L2 semantic cache warmed (threshold=0.92, hit_rate=38.4%)',
      '[PASS] 5,240 RPS sustained across 4 worker nodes | p50: 8.4ms | p99: 19.1ms'
    ]
  },
  {
    id: 'flash-attn2',
    cmd: 'nvprof --kernel flash_attn2_mma_fp16',
    title: 'FlashAttention-2 Bare-Metal PTX/CUDA Kernel',
    summary: 'Warp-level PTX mma.sync.aligned.m16n8k16 + async cp.async SRAM staging.',
    bars: [
      { label: 'PyTorch Eager Attention', value: '68.4 TFLOPS (40.7%)', pct: 41, color: 'bg-slate-600' },
      { label: 'Custom FlashAttention-2 MMA', value: '147.0 TFLOPS (87.5% Peak)', pct: 88, color: 'bg-blue-500' },
      { label: 'HBM Memory Traffic Reduction', value: '7.8x Fewer HBM Reads', pct: 92, color: 'bg-sky-400' }
    ],
    logs: [
      '[CUDA] Compiling mma.sync.aligned.m16n8k16.row.col.f16.f16.f16.f16...',
      '[CUDA] Online softmax register tiling active — zero intermediate O(N^2) HBM spill',
      '[PASS] Achieved 87.5% Tensor Core peak throughput (2.15x speedup vs baseline)'
    ]
  },
  {
    id: 'triton-mlops',
    cmd: 'triton-bench --suite fused-llm-serving',
    title: 'Triton-MLOps Fused Inference Engine',
    summary: 'Fused RMSNorm + RoPE + SwiGLU + INT8 KV-Cache with Kubernetes HPA.',
    bars: [
      { label: 'Unfused Baseline TTFT', value: '120.0 ms', pct: 95, color: 'bg-slate-600' },
      { label: 'Triton Fused Kernel TTFT', value: '4.4 ms (-96.3%)', pct: 8, color: 'bg-blue-500' },
      { label: 'End-to-End Token Throughput', value: '3.7x Speedup', pct: 90, color: 'bg-sky-400' }
    ],
    logs: [
      '[TRITON] Fusing RMSNorm + Rotary Embedding + SwiGLU into single SRAM pass...',
      '[K8S-HPA] Prometheus custom metric queue_depth scaling replicas 2 -> 6',
      '[PASS] Time-To-First-Token reduced from 120.0ms to 4.4ms (96.3% reduction)'
    ]
  },
  {
    id: 'hgemm',
    cmd: 'cuda-bench --kernel hgemm_wmma_stage7',
    title: 'Custom-HGEMM 7-Stage Tensor Core Matrix Multiply',
    summary: '128-bit vectorized float4 loads, shared-memory swizzling & double buffering.',
    bars: [
      { label: 'Naive FP16 CUDA Kernel', value: '1.0x Baseline', pct: 12, color: 'bg-slate-600' },
      { label: 'Stage-7 Swizzled WMMA Kernel', value: '14.0x Speedup (94.2% cuBLAS)', pct: 94, color: 'bg-blue-500' }
    ],
    logs: [
      '[CUDA] Eliminating 32-way shared memory bank conflicts via XOR address swizzling...',
      '[CUDA] Overlapping global-to-shared cp.async with Tensor Core WMMA compute...',
      '[PASS] Reached 94.2% of NVIDIA cuBLAS proprietary throughput (14.0x over naive)'
    ]
  }
];

const BenchmarkTerminal = () => {
  const [selected, setSelected] = useState(BENCHMARKS[0]);

  return (
    <div className="mt-14 nichirin-card rounded-2xl overflow-hidden border border-blue-400/25">
      {/* Terminal Window Header */}
      <div className="px-5 py-3.5 bg-[#02050e] border-b border-blue-400/15 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-blue-500/80" />
            <span className="w-3 h-3 rounded-full bg-sky-400/60" />
            <span className="w-3 h-3 rounded-full bg-slate-600" />
          </div>
          <span className="font-mono text-xs text-slate-300 flex items-center gap-1.5 ml-2">
            <HiTerminal className="w-4 h-4 text-blue-400" />
            <span>paramveer@systems-telemetry:~/benchmarks</span>
          </span>
        </div>

        {/* Preset Selector Buttons */}
        <div className="flex flex-wrap gap-1.5">
          {BENCHMARKS.map((b) => {
            const active = selected.id === b.id;
            return (
              <button
                key={b.id}
                onClick={() => setSelected(b)}
                className={`katana-btn px-3 py-1 rounded-lg font-mono text-[11px] flex items-center gap-1.5 cursor-pointer ${
                  active
                    ? 'bg-[#2563eb] text-white font-bold shadow-[0_0_16px_rgba(37,99,235,0.5)]'
                    : 'bg-[#040c20] text-slate-300 border border-blue-400/15 hover:border-blue-400/45'
                }`}
              >
                <HiPlay className="w-3 h-3" />
                <span>{b.id}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Terminal Body */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selected.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="p-6 bg-[#020611]/90 grid grid-cols-1 lg:grid-cols-12 gap-6"
        >
          {/* Left: Command + Telemetry Logs */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            <div>
              <div className="font-mono text-xs text-blue-400 mb-2">
                $ {selected.cmd}
              </div>
              <h4 className="font-display text-lg font-bold text-white mb-1">
                {selected.title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                {selected.summary}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#010308] border border-blue-400/15 font-mono text-[11px] space-y-1.5 text-slate-300">
              {selected.logs.map((log, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <HiCheckCircle className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                  <span>{log}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Animated Telemetry Bars */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-4">
            {selected.bars.map((bar, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-slate-300">{bar.label}</span>
                  <span className="text-blue-300 font-bold">{bar.value}</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-[#040d21] border border-blue-400/15 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${bar.pct}%` }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: idx * 0.1 }}
                    className={`h-full rounded-full ${bar.color} shadow-[0_0_12px_rgba(59,130,246,0.6)]`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default BenchmarkTerminal;
