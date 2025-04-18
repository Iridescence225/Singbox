
const { type, name } = $arguments
const compatible_outbound = {
  tag: 'COMPATIBLE',
  type: 'direct',
}

let compatible
let config = JSON.parse($files[0])
let proxies = await produceArtifact({
  name,
  type: /^1$|col/i.test(type) ? 'collection' : 'subscription',
  platform: 'sing-box',
  produceType: 'internal',
})

config.outbounds.push(...proxies)

config.outbounds.map(i => {
  if (['🇭🇰 香港'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /港|hk|hongkong|kong kong|🇭🇰/i))
  }
  if (['🇯🇵 日本'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /日本|jp|japan|🇯🇵/i))
  }
  if (['🇸🇬 新加坡'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /新|sg|singapore|🇸🇬/i))
  }
  if (['🇺🇸 美国'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /美|USA|unitedstates|united states|🇺🇸/i))
  }
  if (['TG-SG'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /新|sg|singapore|🇸🇬/i))
  }
  if (['TG-US'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /美|us|unitedstates|united states|🇺🇸/i))
  }
  if (['TG-EU'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /德|荷|DE|NL|Germany|Netherlands|🇩🇪|🇳🇱/i))
  }
})

config.outbounds.forEach(outbound => {
  if (Array.isArray(outbound.outbounds) && outbound.outbounds.length === 0) {
    if (!compatible) {
      config.outbounds.push(compatible_outbound)
      compatible = true
    }
    outbound.outbounds.push(compatible_outbound.tag);
  }
});

$content = JSON.stringify(config, null, 2)

function getTags(proxies, regex) {
  return (regex ? proxies.filter(p => regex.test(p.tag)) : proxies).map(p => p.tag)
}
