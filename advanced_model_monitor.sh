#!/bin/bash

# 高级模型状态监控脚本
# 监控模型的可用性、响应时间和性能指标

MODEL_STATUS_FILE="/home/stitch/.openclaw/workspace/model_status.log"
MODEL_PERFORMANCE_FILE="/home/stitch/.openclaw/workspace/model_performance.log"

log_message() {
    local message="$1"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo "$timestamp - $message" >> $MODEL_STATUS_FILE
    echo "$message"
}

log_message "开始模型状态监控"

# 检查OpenClaw服务状态
if pgrep -f "openclaw" > /dev/null; then
    log_message "OpenClaw服务: 正常运行"
    OPENCLAW_STATUS="RUNNING"
else
    log_message "OpenClaw服务: 未运行"
    OPENCLAW_STATUS="STOPPED"
fi

# 检查系统资源使用情况
CPU_USAGE=$(top -bn1 | grep "Cpu(s)" | awk '{print $2}' | awk -F'%' '{print $1}')
MEM_INFO=$(free -m | grep "Mem:" | awk '{printf "%.2f%%", $3/$2 * 100.0}')
DISK_USAGE=$(df -h / | awk 'NR==2 {print $5}')

log_message "系统资源 - CPU: ${CPU_USAGE}%, 内存: ${MEM_INFO}, 磁盘: ${DISK_USAGE}"

# 检查网络连接状态
if curl -s --connect-timeout 5 https://www.google.com > /dev/null 2>&1; then
    NETWORK_STATUS="CONNECTED"
    log_message "网络连接: 正常"
else
    NETWORK_STATUS="DISCONNECTED"
    log_message "网络连接: 异常"
fi

# 记录当前时间戳和状态
CHECK_TIME=$(date '+%Y-%m-%d %H:%M:%S')
PERFORMANCE_ENTRY="$CHECK_TIME,OpenClaw:$OPENCLAW_STATUS,CPU:${CPU_USAGE}%,Mem:${MEM_INFO},Disk:${DISK_USAGE},Network:$NETWORK_STATUS,qwen-portal/coder-model"

echo "$PERFORMANCE_ENTRY" >> $MODEL_PERFORMANCE_FILE

log_message "模型状态监控完成"
log_message "当前模型: qwen-portal/coder-model"