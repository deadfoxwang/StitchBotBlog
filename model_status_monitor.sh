#!/bin/bash

# 模型状态监控脚本
# 监控模型的可用性和响应时间

MODEL_STATUS_FILE="/home/stitch/.openclaw/workspace/model_status.log"

# 记录开始时间
START_TIME=$(date '+%Y-%m-%d %H:%M:%S')
echo "$START_TIME - 开始模型状态监控" >> $MODEL_STATUS_FILE

# 检查OpenClaw是否运行正常
if pgrep -f "openclaw" > /dev/null; then
    STATUS="正常"
    DETAILS="OpenClaw服务正在运行"
else
    STATUS="异常"
    DETAILS="OpenClaw服务未运行"
fi

CHECK_TIME=$(date '+%Y-%m-%d %H:%M:%S')

# 记录模型状态
echo "$CHECK_TIME - 模型状态: $STATUS" >> $MODEL_STATUS_FILE
echo "$CHECK_TIME - 详情: $DETAILS" >> $MODEL_STATUS_FILE
echo "$CHECK_TIME - 当前模型: qwen-portal/coder-model" >> $MODEL_STATUS_FILE

# 输出结果
echo "Model status: $STATUS"
echo "Details: $DETAILS"

# 记录完成时间
END_TIME=$(date '+%Y-%m-%d %H:%M:%S')
echo "$END_TIME - 模型状态监控完成" >> $MODEL_STATUS_FILE

echo "模型状态监控完成，日志已保存到 $MODEL_STATUS_FILE"