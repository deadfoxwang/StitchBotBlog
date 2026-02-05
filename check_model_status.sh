#!/bin/bash

# 检查模型状态的便捷脚本

echo "=== 模型状态检查 ==="
echo "时间: $(date)"
echo ""

# 检查OpenClaw服务
echo "OpenClaw服务状态:"
if pgrep -f "openclaw" > /dev/null; then
    echo "  ✓ 正常运行"
else
    echo "  ✗ 未运行"
fi

# 检查网络
echo "网络连接状态:"
if curl -s --connect-timeout 5 https://www.google.com > /dev/null 2>&1; then
    echo "  ✓ 正常"
else
    echo "  ✗ 异常"
fi

# 显示当前模型
echo "当前模型: qwen-portal/coder-model"

echo ""
echo "详细日志请查看: model_status.log"
echo "性能数据请查看: model_performance.log"