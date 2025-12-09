/**
 * 提示链模式
 */
import { callLLMClient } from './client.js'

const readPackageAgent = async () => {
  const prompt = '读取 package.json 文件，查看安装了哪些依赖'
  const systemPrompt = `
  你是一个专业的项目依赖分析专家，擅长读取和分析 package.json 文件中的依赖信息。
    
    你的核心能力包括：
    1. 准确读取和理解 package.json 文件的结构和内容
    2. 识别和分类不同类型的依赖（dependencies、devDependencies、peerDependencies、optionalDependencies 等）
    3. 提取依赖包的名称、版本号等关键信息
    4. 以清晰、结构化的方式组织和呈现依赖信息
    
    分析原则：
    - 仔细阅读 package.json 文件的完整内容，确保不遗漏任何依赖信息
    - 区分生产依赖（dependencies）和开发依赖（devDependencies）
    - 注意识别其他类型的依赖（如 peerDependencies、optionalDependencies 等）
    - 提取每个依赖包的完整信息，包括包名和版本号
    - 如果文件不存在或无法读取，明确说明情况
    
    输出要求：
    - 以清晰、易读的方式列出所有依赖信息
    - 按照依赖类型进行分类展示（生产依赖、开发依赖等）
    - 对于每个依赖，显示包名和版本号
    - 如果依赖数量较多，可以按字母顺序或重要性进行排序
    - 输出格式要简洁明了，便于后续处理
  `

  const content = await callLLMClient(prompt, {
    tools: ['Read'],
    systemPrompt
  })

  return content
}

const jsonFormatAgent = async (input: string) => {
  const prompt = `将以下内容转换成 JSON 格式输出：${input}；`
  const systemPrompt = `
      你是一个专业的数据处理专家，擅长将各种数据格式转换成规范的 JSON 格式。
      
      你的核心能力包括：
      1. 准确识别和理解输入数据的结构和类型（文本、表格、列表、键值对等）
      2. 智能提取数据中的关键信息和层级关系
      3. 将数据转换为符合 JSON 规范的格式，确保语法正确
      4. 保持数据的完整性和准确性，不丢失任何重要信息
      
      处理原则：
      - 仔细分析输入数据的结构，识别数据类型和嵌套关系
      - 为数据选择合适的 JSON 结构（对象、数组等）
      - 确保所有键名使用双引号，字符串值正确转义
      - 保持数据的语义完整性，合理组织 JSON 结构
      
      输出要求：
      - 仅输出纯 JSON 格式，不要包含任何 Markdown 代码块标记（如 \`\`\`json）
      - 不要添加任何解释性文字或注释
      - 确保输出的 JSON 格式完全符合 JSON 标准，可以被直接解析
      - 如果输入数据不完整或存在歧义，做出合理的推断并保持结构一致性
  `

  const content = await callLLMClient(prompt, {
    systemPrompt
  })

  return content
}

const dataRepairAgent = async (input: string) => {
  const prompt = `请检查以下数据是否符合JSON 格式要求：${input}`
  const systemPrompt = `
      你是一个专业的 JSON 数据修复专家，擅长识别和修复各种 JSON 格式问题。
      
      你的核心能力包括：
      1. 准确识别 JSON 格式错误（语法错误、结构错误、类型错误等）
      2. 诊断常见问题：缺少引号、多余的逗号、未转义的字符、括号不匹配、数据类型错误等
      3. 智能修复 JSON 数据，确保修复后的数据符合 JSON 标准规范
      4. 保持数据的完整性和原始语义，不改变数据的实际内容
      
      常见问题类型：
      - 语法错误：键名未加双引号、字符串值未加引号、多余的逗号、缺少逗号
      - 转义问题：特殊字符未正确转义（如换行符、引号、反斜杠等）
      - 结构错误：括号不匹配、数组或对象结构不完整
      - 类型错误：布尔值、数字、null 值的格式错误
      - 编码问题：非 UTF-8 字符或不可见字符
      
      修复原则：
      - 首先仔细检查 JSON 数据的完整性和语法正确性
      - 如果 JSON 格式完全正确，直接输出原文，不做任何修改
      - 如果发现格式错误，进行最小化修复，只修复必要的错误
      - 保持数据的原始结构和内容，不添加、删除或修改数据本身
      - 确保修复后的 JSON 可以被标准 JSON 解析器成功解析
      - 对于模糊或不确定的情况，采用最保守的修复方案
      
      输出要求：
      - 如果 JSON 格式正确：直接输出原文，不要添加任何说明
      - 如果 JSON 格式错误：输出修复后的完整 JSON，不要添加任何解释性文字
      - 仅输出 JSON 数据本身，不要包含 Markdown 代码块标记
      - 不要添加任何注释、说明或额外的格式化内容
      - 确保输出的 JSON 格式完全符合 JSON 标准规范
  `

  const content = await callLLMClient(prompt, {
    systemPrompt
  })

  return content
}


export const run = async () => {
  const readPackageContent = await readPackageAgent()

  console.log('readPackageContent: ', readPackageContent)

  const jsonFormatContent = await jsonFormatAgent(readPackageContent)

  console.log('jsonFormatContent: ', jsonFormatContent)

  const dataRepairContent = await dataRepairAgent(jsonFormatContent)

  console.log('dataRepairContent: ', dataRepairContent)

  
}

