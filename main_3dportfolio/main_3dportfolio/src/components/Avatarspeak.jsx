import React, { useEffect, useRef, useState } from 'react';
import { useFBX, useGLTF, useAnimations } from '@react-three/drei';
import { useControls } from 'leva';
import { useFrame, useLoader } from '@react-three/fiber';

import * as THREE from 'three';

const corresponding = {
  A: 'viseme_PP',
  B: 'viseme_kk',
  C: 'viseme_I',
  D: 'viseme_AA',
  E: 'viseme_O',
  F: 'viseme_U',
  G: 'viseme_FF',
  H: 'viseme_TH',
  X: 'viseme_PP',
};

export function AvatarSpeak(props) {
  

  const { playAudio, script, headFollow } = useControls({
    playAudio: true,
    script: {
      value: 'welcome',
    },
    headFollow: true,
  });

  const audio = useRef(new Audio(`/audio/${script}.mp3`));
  const jsonFile = useLoader(THREE.FileLoader, `audio/${script}.json`);
  const lipsync = JSON.parse(jsonFile);
  
  // Add animation state
  const [animation, setAnimation] = useState('Idle');

  useFrame((state) => {
    const currentAudioTime = audio.current.currentTime;
    if(headFollow){
      const headObject = group.current.getObjectByName("Head");
      headObject.position.set(0, 0.15, 0.01);
    }
    
    if(audio.paused || audio.ended) {
      setAnimation("Idle");
    }

    Object.values(corresponding).forEach((value) => {
      nodes.Wolf3D_Head.morphTargetInfluences[
        nodes.Wolf3D_Head.morphTargetDictionary[value]
      ] = 0;
      nodes.Wolf3D_Teeth.morphTargetInfluences[
        nodes.Wolf3D_Teeth.morphTargetDictionary[value]
      ] = 0;
    });

    for( let i=0; i<lipsync.mouthCues.length; i++){
      const mouthCue = lipsync.mouthCues[i];
      if (currentAudioTime >=mouthCue.start &&  
          currentAudioTime <= mouthCue.end
      ){
        console.log(mouthCue.value)
        nodes.Wolf3D_Head.morphTargetInfluences[
          nodes.Wolf3D_Head.morphTargetDictionary[corresponding[mouthCue.value]]
        ] = 1;
        nodes.Wolf3D_Teeth.morphTargetInfluences[
          nodes.Wolf3D_Teeth.morphTargetDictionary[corresponding[mouthCue.value]]
        ] = 1;
        break;
      }
    }
  })


  const { nodes, materials } = useGLTF('/models/avatar.glb');
  const { animations: idleAnimation } = useFBX('/animations/Idle.fbx');
  const { animations: angryAnimation } = useFBX('/animations/Angry.fbx');
  const { animations: greetingAnimation } = useFBX('/animations/Waving.fbx');
  const { animations: saluteAnimation } = useFBX('/animations/Salute.fbx');
  const { animations: warmAnimation } = useFBX('/animations/Warming.fbx');

  idleAnimation[0].name = 'Idle';
  angryAnimation[0].name = 'Angry';
  greetingAnimation[0].name = 'Greeting';
  saluteAnimation[0].name = 'Salute';
  warmAnimation[0].name = 'Warm';

  const group = useRef();
  const { actions } = useAnimations(
    [idleAnimation[0], angryAnimation[0], greetingAnimation[0], saluteAnimation[0], warmAnimation[0]],
    group
  );

  const handleKeyPress = (event) => {
    if(playAudio){
      
      if (event.key === 's'){
        audio.current.play();
        setAnimation('Salute')

        const animationTimeout = setTimeout(() => {
          setAnimation('Idle');
        }, 1500);
        return () => clearTimeout(animationTimeout);
      }
    }
    else{
      setAnimation('Idle');
      audio.current.pause();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  useEffect(() => {
    actions[animation].reset().fadeIn(0.5).play();
    return () => actions[animation].fadeOut(0.5);
  }, [animation]);

  return (
    <group {...props} dispose={null} ref={group}>
      <primitive object={nodes.Hips} />
      <skinnedMesh geometry={nodes.Wolf3D_Body.geometry} material={materials.Wolf3D_Body} skeleton={nodes.Wolf3D_Body.skeleton} />
      <skinnedMesh geometry={nodes.Wolf3D_Outfit_Bottom.geometry} material={materials.Wolf3D_Outfit_Bottom} skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton} />
      <skinnedMesh geometry={nodes.Wolf3D_Outfit_Footwear.geometry} material={materials.Wolf3D_Outfit_Footwear} skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton} />
      <skinnedMesh geometry={nodes.Wolf3D_Outfit_Top.geometry} material={materials.Wolf3D_Outfit_Top} skeleton={nodes.Wolf3D_Outfit_Top.skeleton} />
      <skinnedMesh geometry={nodes.Wolf3D_Hair.geometry} material={materials.Wolf3D_Hair} skeleton={nodes.Wolf3D_Hair.skeleton} />
      <skinnedMesh name="EyeLeft" geometry={nodes.EyeLeft.geometry} material={materials.Wolf3D_Eye} skeleton={nodes.EyeLeft.skeleton} morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary} morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences} />
      <skinnedMesh name="EyeRight" geometry={nodes.EyeRight.geometry} material={materials.Wolf3D_Eye} skeleton={nodes.EyeRight.skeleton} morphTargetDictionary={nodes.EyeRight.morphTargetDictionary} morphTargetInfluences={nodes.EyeRight.morphTargetInfluences} />
      <skinnedMesh name="Wolf3D_Head" geometry={nodes.Wolf3D_Head.geometry} material={materials.Wolf3D_Skin} skeleton={nodes.Wolf3D_Head.skeleton} morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences} />
      <skinnedMesh name="Wolf3D_Teeth" geometry={nodes.Wolf3D_Teeth.geometry} material={materials.Wolf3D_Teeth} skeleton={nodes.Wolf3D_Teeth.skeleton} morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences} />
    </group>
  );
}

useGLTF.preload('/models/avatar.glb');
