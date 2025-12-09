uniform float uTime;
uniform float uSize;

attribute float aScale;
attribute vec3 aRandomness;
varying vec3 vColor;

void main()
{
    
    vec4 modelPosition=modelMatrix*vec4(position,1.);
    
    float angle=atan(modelPosition.x,modelPosition.z);
    float distanceTocenter=length(modelPosition.xz);
    float offset=(1./distanceTocenter)*uTime*.2;
    angle+=offset;
    modelPosition.x=cos(angle) *distanceTocenter;
    modelPosition.z=sin(angle) *distanceTocenter;

    //adding randomness
    modelPosition.xyz+=aRandomness;

    vec4 viewPosition=viewMatrix*modelPosition ;
    vec4 projectionPosition=projectionMatrix*viewPosition;
    gl_Position=projectionPosition;
    
    gl_PointSize=uSize*aScale;
    gl_PointSize*=(1./-viewPosition.z);
    
    vColor=color;
}