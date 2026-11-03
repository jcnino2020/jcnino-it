# VLAN, inter-VLAN routing and DHCP practice

Prepared 3 November 2026 for JC Niñonuevo's portfolio.
This is a newly authored learning example, not an assessment result or a saved Packet Tracer simulation. Configurations were reviewed against Cisco documentation; they have not been executed in Packet Tracer or on a physical device.

## Build an isolated topology
Use one Cisco 1941 router (R1), one Catalyst 2960 switch (S1), and two PCs.
Connect R1 GigabitEthernet0/0 to S1 FastEthernet0/24.
Connect PC-A to S1 FastEthernet0/1 and PC-B to S1 FastEthernet0/2 with copper straight-through cables.
Create a new topology; do not apply these snippets to an existing production network. Device interface names may differ on other models.

## Addressing
- VLAN 10 STUDENTS: 192.168.10.0/24; gateway 192.168.10.1.
- VLAN 20 STAFF: 192.168.20.0/24; gateway 192.168.20.1.
- Addresses .1-.20 are excluded from DHCP in both networks.
- DHCP clients may receive .21-.254; exact leases depend on device state.

## Configure
Open the CLI on S1 and enter S1.cfg. Then configure R1 with R1.cfg. These files start with `enable`, followed by `configure terminal`; paste from an appropriate initial device prompt. They intentionally omit production management/security configuration. Set both PC IPv4 adapters to DHCP. Wait for link state and address assignment.

## Verify (expected, not observed results)
1. S1: `show vlan brief` should place F0/1 in VLAN 10 and F0/2 in VLAN 20.
2. S1: `show interfaces trunk` should show F0/24 carrying VLANs 10 and 20.
3. R1: `show ip interface brief` should show G0/0 and its two subinterfaces up/up.
4. R1: `show ip route` should include both connected /24 networks.
5. R1: `show ip dhcp binding` should list the allocated client addresses.
6. Each PC: check the address, mask, and gateway; ping its own gateway first.
7. Ping the other PC's allocated address to test inter-VLAN routing. An initial ping may time out while ARP resolves; retry and investigate persistent loss.
8. Save the working topology as a new .pkt file yourself after testing.

## Troubleshoot
- No lease: check cables, physical interface status, switch access VLAN, trunk allowed VLANs, subinterface tags, and DHCP pool subnet.
- Same VLAN only: verify the host's default gateway and router subinterface configuration.
- Trunk command rejected: a 2960 uses 802.1Q; do not add `switchport trunk encapsulation dot1q` on a model that does not support it.
- Interface command rejected: confirm the actual interface names for the selected model.

## References
- Cisco inter-VLAN routing: https://www.cisco.com/c/en/us/support/docs/lan-switching/inter-vlan-routing/14976-50.html
- Cisco DHCP server configuration: https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/ipaddr_dhcp/configuration/15-mt/dhcp-15-mt-book/config-dhcp-server.html

No .pkt/.pka artifact or real lab completion claim is included.
