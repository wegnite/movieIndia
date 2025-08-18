'use client';

import { useState } from 'react';
import Image from 'next/image';
import { characters } from '@/data/characters';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Star, Shield, Sword, Heart, Crown, Sparkles } from 'lucide-react';

// 角色图标映射
const roleIcons = {
  protagonist: Shield,
  antagonist: Sword,
  supporting: Heart,
};

// 角色颜色映射
const roleColors = {
  protagonist: 'bg-green-500/10 text-green-700 border-green-200',
  antagonist: 'bg-red-500/10 text-red-700 border-red-200',
  supporting: 'bg-blue-500/10 text-blue-700 border-blue-200',
};

export default function CastPage() {
  const [selectedCharacter, setSelectedCharacter] = useState(characters[0]);
  const [activeTab, setActiveTab] = useState('all');

  // 过滤角色
  const filteredCharacters = activeTab === 'all' 
    ? characters 
    : characters.filter(char => char.role === activeTab);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* 页面标题区域 */}
      <div className="relative bg-gradient-to-r from-orange-600 to-red-600 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">演员阵容 & 角色介绍</h1>
          <p className="text-xl opacity-90">
            探索《Mahavatar Narsimha》中的神话角色与配音演员
          </p>
        </div>
        
        {/* 装饰性元素 */}
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-orange-50 to-transparent"></div>
      </div>

      {/* 主要内容区域 */}
      <div className="container mx-auto px-4 py-12">
        {/* 角色过滤标签 */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-4">
            <TabsTrigger value="all">全部角色</TabsTrigger>
            <TabsTrigger value="protagonist">正派</TabsTrigger>
            <TabsTrigger value="antagonist">反派</TabsTrigger>
            <TabsTrigger value="supporting">配角</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* 角色网格展示 */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* 左侧角色列表 */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-orange-500" />
              角色列表
            </h2>
            <div className="space-y-3">
              {filteredCharacters.map((character) => {
                const Icon = roleIcons[character.role];
                return (
                  <Card
                    key={character.id}
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      selectedCharacter.id === character.id 
                        ? 'ring-2 ring-orange-500 shadow-lg' 
                        : ''
                    }`}
                    onClick={() => setSelectedCharacter(character)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                          <Image
                            src={character.image}
                            alt={character.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{character.name}</h3>
                          <p className="text-sm text-gray-600">{character.title}</p>
                          <Badge 
                            variant="outline" 
                            className={`mt-1 ${roleColors[character.role]}`}
                          >
                            <Icon className="w-3 h-3 mr-1" />
                            {character.role === 'protagonist' && '正派'}
                            {character.role === 'antagonist' && '反派'}
                            {character.role === 'supporting' && '配角'}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* 右侧角色详情 */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <div className="relative h-96 w-full">
                <Image
                  src={selectedCharacter.image}
                  alt={selectedCharacter.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h2 className="text-4xl font-bold mb-2">{selectedCharacter.name}</h2>
                  <p className="text-xl opacity-90">{selectedCharacter.title}</p>
                </div>
              </div>

              <CardContent className="p-8">
                {/* 角色描述 */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Crown className="w-6 h-6 text-orange-500" />
                    角色简介
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {selectedCharacter.description}
                  </p>
                </div>

                {/* 背景故事 */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-4">背景故事</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {selectedCharacter.backstory}
                  </p>
                </div>

                {/* 能力展示 */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-4">特殊能力</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedCharacter.powers.map((power, index) => (
                      <div 
                        key={index}
                        className="flex items-center gap-2 bg-orange-50 rounded-lg p-3"
                      >
                        <Star className="w-5 h-5 text-orange-500 flex-shrink-0" />
                        <span className="font-medium">{power}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 配音演员信息 */}
                <Card className="bg-gray-50">
                  <CardHeader>
                    <CardTitle>配音演员信息</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2">印地语版本</h4>
                        <p className="text-gray-600">即将公布</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">英语版本</h4>
                        <p className="text-gray-600">即将公布</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">泰卢固语版本</h4>
                        <p className="text-gray-600">即将公布</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">泰米尔语版本</h4>
                        <p className="text-gray-600">即将公布</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 幕后花絮 */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-3xl">幕后制作</CardTitle>
            <CardDescription>了解角色设计与创作过程</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">8+</div>
                <p className="text-gray-600">主要角色</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">500+</div>
                <p className="text-gray-600">动画设计稿</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">3年</div>
                <p className="text-gray-600">角色开发时间</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 相关内容推荐 */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-8">探索更多内容</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
              观看预告片
            </Button>
            <Button size="lg" variant="outline">
              查看剧照画廊
            </Button>
            <Button size="lg" variant="outline">
              阅读最新资讯
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}