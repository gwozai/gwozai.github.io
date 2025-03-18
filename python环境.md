def generate_conda_path_env_var(conda_base_path):
    """
    生成 Conda 环境变量路径字符串

    参数:
    conda_base_path (str): Conda 的基础安装路径

    返回:
    str: 格式化的环境变量路径字符串
    """
    # 定义需要添加的子路径
    subpaths = [
        '',             # 主目录
        r'\Scripts',    # Scripts 目录
        r'\Library\mingw-w64\bin',  # mingw-w64 bin 目录
        r'\Library\bin'  # Library bin 目录
    ]

    # 生成完整路径列表
    full_paths = [conda_base_path + path for path in subpaths]

    # 生成环境变量格式的路径字符串
    env_var_path = ';' + ';'.join(full_paths) + ';'

    return env_var_path

def main():
    # 获取用户输入
    while True:
        conda_path = input("请输入 Conda 安装路径（例如 D:\\ProgramData\\anaconda3）: ").strip()

        # 简单的路径有效性检查
        if conda_path and ':' in conda_path:
            # 生成并打印环境变量路径
            result = generate_conda_path_env_var(conda_path)
            print("\n生成的环境变量路径：")
            print(result)

            # 询问是否继续
            continue_choice = input("\n是否继续？(y/n): ").lower()
            if continue_choice != 'y':
                break
        else:
            print("无效的路径，请重新输入。")

if __name__ == "__main__":
    main()


# 环境变量路径生成需求

## 输入参数
- 基础路径：D:\ProgramData\anaconda3

## 生成要求
1. 使用分号分隔
2. 包含以下子目录：
   - 主目录
   - Scripts
   - Library\mingw-w64\bin
   - Library\bin
3. 每个路径前后不需要额外空格
4. 以分号开头和结尾

## 期望输出格式
;路径1;路径2;路径3;路径4;

## 示例期望
;D:\ProgramData\anaconda3;D:\ProgramData\anaconda3\Scripts;D:\ProgramData\anaconda3\Library\mingw-w64\bin;D:\ProgramData\anaconda3\Library\bin;