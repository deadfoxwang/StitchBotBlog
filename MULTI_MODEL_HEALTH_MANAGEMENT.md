# 多模型健康检查和切换管理系统

## 功能概述
此系统用于检查多个AI模型的健康状态，并在主模型不可用时自动切换到备用模型。

## 组件

### 1. 健康检查脚本
- `model_health_manager.sh`: 主要的健康检查和管理脚本
- 支持检查多个模型的可用性
- 管理主模型和备用模型列表
- 自动切换功能（待实现）

### 2. 配置文件
- `model_config.json`: 模型配置文件
- 定义主模型和备用模型列表
- 设置健康检查参数

### 3. 状态文件
- `model_health_status.json`: 实时健康状态
- 记录当前模型、健康状态和可用模型列表

## 使用方法

### 执行健康检查
```bash
bash model_health_manager.sh check
```

### 查看当前状态
```bash
bash model_health_manager.sh status
```

### 切换模型（预留功能）
```bash
bash model_health_manager.sh switch <model_name>
```

## 配置

系统默认配置：
- 主模型: `qwen-portal/coder-model`
- 备用模型: 
  - `qwen-portal/qwen-max`
  - `qwen-portal/qwen-plus`
  - `openai/gpt-4o`
  - `openai/gpt-4-turbo`

## 日志文件
- `model_health_check.log`: 健康检查日志
- 记录每次检查的结果和系统操作

## 自动化
- 建议设置cron任务定期运行健康检查
- 可以与其他监控系统集成

## 注意事项
- 实际的模型切换功能需要OpenClaw内部API支持
- 当前版本提供框架和占位符功能
- 需要与OpenClaw核心系统集成才能实现完整的切换功能